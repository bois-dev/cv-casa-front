import { Box, Step, StepButton, Stepper, ThemeProvider, createTheme } from "@mui/material";
import PageTitle from "../../components/title/pagetitle.component";
import Container from '@mui/material/Container';
import { useState } from "react";
import SideBar from "../../components/sidebar/sidebar.component";
import RegisterService from "./register-user.service";
import { toast } from "react-toastify";
import { User } from "../../model/user.model";
import BasicInfo from "./basic-info/register-basicinfo.page";
import Button from "../../components/button/button.component";
import RegisterDocs from "./documents/register-docs.page";
import Summary from "./summary/summary.page";
import { stepLabels, steps } from "./register-user.interfaces";

const theme = createTheme();

export interface RegisterClientProps {
    client?: User
}

export default function RegisterUser(props: RegisterClientProps) {
    const [current, setCurrent] = useState<User>(props.client!);
    const [activeStep, setActiveStep] = useState(0);
    const [submiting, setSubmiting] = useState(false);

    let service: RegisterService;

    const onCurrentChange = async (user: User) => {
        await setCurrent(user);
    }

    const onSubmit = async () => {
        //validate
        await setSubmiting(true);

        console.log(current)

        try {
            service ??= new RegisterService();

            const { data } = await service.saveUser(current!);

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
                    {stepLabels.map((value, index) =>
                        <Step key={index}>
                            <StepButton onClick={async () => await onSliderButtonClick(index)}>{value}</StepButton>
                        </Step>)}
                </Stepper>
                {activeStep === steps.BasicInfo && <BasicInfo
                    current={current!}
                    onCurrentChange={onCurrentChange}
                />}

                {activeStep === steps.Documents && <RegisterDocs
                    current={current!}
                    onCurrentChange={onCurrentChange}
                />}

                {activeStep === steps.Summary && <Summary
                    current={current!}
                    onCurrentChange={onCurrentChange}
                />}

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
            display:'flex', 
            justifyContent: 'flex-end',
            mt: 3
        }}
    >
        <Button
            variant="contained"
            disabled={activeStep <= 0} onClick={async () => await onSliderButtonClick(activeStep - 1)} sx={{ mr: 1 }}>
            Anterior
        </Button>
        {!submiting && <Button
            variant="contained"
            onClick={async () => await onSliderButtonClick(activeStep + 1)} sx={{ mr: 1 }}>
            {activeStep !== stepLabels.length - 1 ? 'Proximo' : 'Concluir'}
        </Button>}
    </Box>
}