import { Box, Step, StepButton, Stepper, ThemeProvider, createTheme } from "@mui/material";
import PageTitle from "../../components/title/pagetitle.component";
import Container from '@mui/material/Container';
import { useState } from "react";
import SideBar from "../../components/sidebar/sidebar.component";
import { toast } from "react-toastify";
import { Button } from "../../components/button/button.component";
import { stepLabels } from "./register-realtor.interface";
import { Realtor } from "../../model/realtor.model";
import RegisterRealtorService from "./register-realtor.service";
import RealtorBasicInfo from "./basic-info/register-realtor-basicinfo.page";

const theme = createTheme();

export interface RegisterClientProps {
    client?: Realtor
}

export default function RegisterRealtor(props: RegisterClientProps) {
    const [current, setCurrent] = useState<Realtor>(props.client!);
    const [activeStep, setActiveStep] = useState(0);
    const [submiting, setSubmiting] = useState(false);

    let service: RegisterRealtorService;

    const onCurrentChange = async (realtor: Realtor) => {
        await setCurrent(realtor);
    }

    const onSubmit = async () => {
        //validate
        await setSubmiting(true);

        console.log(current)

        try {
            service ??= new RegisterRealtorService();

            const { data } = await service.save(current!);

            if (data) {
                toast.success('Datos guardados correctamente');
            }
        } catch (e: any) {
            toast.error(e)
        }
        finally {
            await setSubmiting(false);
        }
    }

    const onSliderButtonClick = async (index: number) => {
        if (index < stepLabels.length && index >= 0)
            await setActiveStep(index);

        if (index === stepLabels.length)
            await onSubmit()
    }

    return <SideBar>
        <ThemeProvider theme={theme}>
            <Container maxWidth="md">
                <PageTitle text="Rellena sus datos" />
                <Stepper activeStep={activeStep} alternativeLabel nonLinear>
                    {stepLabels.map((value: any, index: number) =>
                        <Step key={index}>
                            <StepButton onClick={async () => await onSliderButtonClick(index)}>{value}</StepButton>
                        </Step>)}
                </Stepper>

                <RealtorBasicInfo
                    current={current!}
                    onCurrentChange={onCurrentChange}
                />

                <InternalFooter
                    activeStep={activeStep}
                    submiting={submiting}
                    onSliderButtonClick={onSliderButtonClick}
                />

            </Container>
        </ThemeProvider>
    </SideBar>
}


interface InternalFooterProps {
    activeStep: number,
    submiting: boolean,
    onSliderButtonClick: (n: number) => Promise<any>
}

function InternalFooter(props: InternalFooterProps) {
    const { activeStep, submiting, onSliderButtonClick } = props;

    return <Box
        sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 3
        }}
    >
        {!submiting && <Button
            variant="contained"
            onClick={async () => await onSliderButtonClick(activeStep + 1)} sx={{ mr: 1 }}>
            {activeStep !== stepLabels.length - 1 ? 'Proximo' : 'Concluir'}
        </Button>}
    </Box>
}