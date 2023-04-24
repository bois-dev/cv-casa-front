import { Backdrop, Box, Button, Checkbox, CircularProgress, Divider, FormControlLabel, ThemeProvider, createTheme } from "@mui/material";
import PageTitle from "../../components/title/pagetitle.component";
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/sidebar.component";
import { toast } from "react-toastify";
import SearchUsersService from "./search-users.service";
import { SearchFields } from "./search-users.interfaces";
import { Button as MyButton } from "../../components/button/button.component";
import NakedSelect from "../../components/select/naked-select.component";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchUsersMoreFilters from "./search-users-more-filters.page";

const theme = createTheme();
const filterKey = 'search-users';

export interface SearchUsersProps {
    search?: SearchFields
}

const defaultItemsBoolean = [
    { value: -1, label: 'Indiferente' },
    { value: 0, label: 'No' },
    { value: 1, label: 'Si' },
]

export default function SearchUsers(props: SearchUsersProps) {
    const [current, setCurrent] = useState<SearchFields>(props.search!);

    const [submiting, setSubmiting] = useState(false);
    const [showMoreFilters, setShowMoreFilters] = useState(false);

    useEffect(() => {
        const filters: SearchFields = JSON.parse(localStorage.getItem(filterKey)!);

        if (filters && filters.save) {
            console.log(filters)
            setCurrent(filters)
        }
        else setCurrent({ save: false } as SearchFields)
    }, [])

    // eslint-disable-next-line
    let service: SearchUsersService;

    const onSearch = async () => {
        //validate
        await setSubmiting(true);

        console.log(current)

        try {
            service ??= new SearchUsersService();

            await service.search(current)
        } catch (e: any) {
            toast.error(e)
        }
        finally {
            await setSubmiting(false);
        }
    }

    const onSaveFilter = async () => {
        localStorage.setItem(filterKey, JSON.stringify({ ...current, save: true }))
    }

    const getTotalOtherFiltersApplied = () : number => {
        let total = 0;

        if (current?.age.from !== -1 || current?.age.to !== -1) total++;
        
        return total;
    }

    return <SideBar>
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <PageTitle text="Buscar usuarios" />
                <Divider sx={{ mb: 2 }} />

                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    <Button
                        variant="contained"
                        size={'small'}
                        startIcon={<FilterAltIcon />}
                        sx={{
                            fontSize: 12,
                            mr: 3,
                            height: '40px'

                        }}
                        onClick={async () => await setShowMoreFilters(true)}>
                        {`Filtros (${getTotalOtherFiltersApplied()})`}
                    </Button>

                    <NakedSelect
                        sx={{ mr: 2, mb: 2 }}
                        id="hasPets-select"
                        items={defaultItemsBoolean}
                        label="Mascotas"
                        name="hasPets-label"
                        value={current?.hasPets ?? -1}
                        onChange={async (e) => await setCurrent({ ...current!, hasPets: e })}
                    />

                    <NakedSelect
                        sx={{ mr: 2, mb: 2 }}
                        id="hasKids-select"
                        items={defaultItemsBoolean}
                        label="Niños Pequeños"
                        name="hasKids-label"
                        value={current?.hasKids ?? -1}
                        onChange={async (e) => await setCurrent({ ...current!, hasKids: e })}
                    />

                    <NakedSelect
                        sx={{ mr: 2, mb: 2, minWidth: '200px' }}
                        id="hasDocs-select"
                        items={defaultItemsBoolean}
                        label="Puede residir legalmente en España"
                        name="hasDocs-label"
                        value={current?.hasDocs ?? -1}
                        onChange={async (e) => await setCurrent({ ...current!, hasDocs: e })}
                    />

                    <NakedSelect
                        sx={{ mr: 2, mb: 2, minWidth: '200px' }}
                        id="alreadyInSpain-select"
                        items={defaultItemsBoolean}
                        label="Ya está en España"
                        name="alreadyInSpain-label"
                        value={current?.alreadyInSpain ?? -1}
                        onChange={async (e) => await setCurrent({ ...current!, alreadyInSpain: e })}
                    />
                </Box>

                <InternalFooter
                    current={current}
                    onSearchClick={onSearch}
                    onSaveFilter={onSaveFilter}
                />

                <Backdrop
                    sx={{ color: '#fff' }}
                    open={submiting}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                {showMoreFilters && <SearchUsersMoreFilters
                    current={current}
                    onClose={async () => await setShowMoreFilters(false)}
                    onFilter={async (newFilter: SearchFields) => await setCurrent({ ...current, ...newFilter })}
                />}

                {/*Search results*/}

            </Container>
        </ThemeProvider>
    </SideBar>
}


interface InternalFooterProps {
    current: SearchFields,
    onSearchClick: () => Promise<any>,
    onSaveFilter: () => Promise<any>,
}

function InternalFooter(props: InternalFooterProps) {
    const [saveFilter, setSaveFilter] = useState(props.current?.save ?? false);

    const onSearchClick = async () => {
        if (saveFilter)
            await props.onSaveFilter();

        await props.onSearchClick();
    }

    return <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 3
        }}
    >
        <FormControlLabel
            control={
                <Checkbox
                    checked={saveFilter}
                    name="hasKids"
                    color="primary"
                    onChange={async () => await setSaveFilter(!saveFilter)}
                />
            }
            label={'Salvar filtros'}
        />

        <MyButton
            variant="contained"
            onClick={onSearchClick} sx={{ mr: 1 }}>
            {'Buscar'}
        </MyButton>
    </Box>
}