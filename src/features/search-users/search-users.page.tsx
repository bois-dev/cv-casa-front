import { Backdrop, Box, Button, Checkbox, CircularProgress, FormControlLabel, ThemeProvider, createTheme } from "@mui/material";
import PageTitle from "../../components/title/pagetitle.component";
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/sidebar.component";
import { toast } from "react-toastify";
import SearchUsersService from "./search-users.service";
import { SearchFields } from "./search-users.interfaces";
import NakedSelect from "../../components/select/naked-select.component";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchUsersMoreFiltersDialog from "./search-users-more-filters.dialog";
import { User } from "../../model/user.model";
import SearchResultItem from "./search-users-item.page";

import avatar from '../../assets/avatar.png'

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
    const [users, setUsers] = useState<User[]>();

    const [submiting, setSubmiting] = useState(false);
    const [showMoreFilters, setShowMoreFilters] = useState(false);

    // eslint-disable-next-line
    let service = new SearchUsersService();

    useEffect(() => {
        const filters: SearchFields = JSON.parse(localStorage.getItem(filterKey)!);

        if (filters && filters.save) {
            console.log(filters)
            setCurrent(filters)
        }
        else setCurrent({ save: false } as SearchFields)
    }, [])



    const onSearch = async (local: SearchFields) => {
        //validate
        await setCurrent(local);

        await setSubmiting(true);

        if (current.save)
            await onSaveFilter(local)

        try {
            //const { data } = await service.search(local)
            const data: User[] = [
                {
                    age: 34,
                    alreadyInSpain: true,
                    antecipateRents: 6,
                    fullname: "Rogerson Nazario",
                    hasDocs: true,
                    hasKids: true,
                    hasPets: true,
                    contacts: {
                        email: "rrnazario@gmail.com",
                        cel: "988643732"
                    },
                    peopleQt: 0,
                    wantsToPay: 1000,
                },
                {
                    age: 30,
                    alreadyInSpain: true,
                    antecipateRents: 3,
                    fullname: "Thuane Mello",
                    hasDocs: true,
                    hasKids: false,
                    hasPets: true,
                    contacts: {
                        email: "thuanemello17@gmail.com",
                        cel: "99998888"
                    },
                    peopleQt: 1,
                    wantsToPay: 950,
                    documents: [
                        {
                            date: new Date(2023, 1, 1),
                            id: 0,
                            name: 'papel',
                            file: new File([new Blob([avatar])], "example.jpg")
                        },
                        {
                            date: new Date(2023, 1, 1),
                            id: 3,
                            name: 'papelada',
                            file: new File([new Blob([avatar])], "example.jpg")
                        },
                        {
                            date: new Date(2023, 1, 1),
                            id: 2,
                            name: 'jajajaja',
                            file: new File([new Blob([avatar])], "example.jpg")
                        },

                    ]
                },
            ]
            if (data) {
                await setUsers(data)
            }
        } catch (e: any) {
            console.log(e)
            toast.error(e)
        }
        finally {
            await setSubmiting(false);
        }
    }

    const onSaveFilter = async (local: SearchFields) => {
        localStorage.setItem(filterKey, JSON.stringify(local))
    }

    const getTotalOtherFiltersApplied = (): number => {
        let total = 0;

        if ((current?.age?.from ?? -1) !== -1 || (current?.age?.to ?? -1) !== -1) total++;
        if ((current?.peopleQt?.from ?? -1) !== -1 || (current?.peopleQt?.to ?? -1) !== -1) total++;
        if ((current?.wantsToPay?.from ?? -1) !== -1 || (current?.wantsToPay?.to ?? -1) !== -1) total++;
        if ((current?.antecipateRents?.from ?? -1) !== -1 || (current?.antecipateRents?.to ?? -1) !== -1) total++;

        return total;
    }

    return <SideBar>
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <PageTitle text="Buscar usuarios" />

                <Box sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    maxWidth: '1000px'
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
                        {`+Filtros (${getTotalOtherFiltersApplied()})`}
                    </Button>

                    <NakedSelect
                        sx={{ mr: 2, mb: 2 }}
                        id="hasPets-select"
                        items={defaultItemsBoolean}
                        label="Mascotas"
                        name="hasPets-label"
                        value={current?.hasPets ?? -1}
                        onChange={async (e) => {
                            const local = { ...current!, hasPets: e }
                            await onSearch(local)
                        }}
                    />

                    <NakedSelect
                        sx={{ mr: 2, mb: 2 }}
                        id="hasKids-select"
                        items={defaultItemsBoolean}
                        label="Niños Pequeños"
                        name="hasKids-label"
                        value={current?.hasKids ?? -1}
                        onChange={async (e) => {
                            const local = { ...current!, hasKids: e }
                            await onSearch(local)
                        }}
                    />

                    <NakedSelect
                        sx={{ mr: 2, mb: 2, minWidth: '200px' }}
                        id="hasDocs-select"
                        items={defaultItemsBoolean}
                        label="Puede residir legalmente en España"
                        name="hasDocs-label"
                        value={current?.hasDocs ?? -1}
                        onChange={async (e) => {
                            const local = { ...current!, hasDocs: e }

                            await onSearch(local)
                        }}
                    />

                    <NakedSelect
                        sx={{ mr: 2, mb: 2, minWidth: '200px' }}
                        id="alreadyInSpain-select"
                        items={defaultItemsBoolean}
                        label="Ya está en España"
                        name="alreadyInSpain-label"
                        value={current?.alreadyInSpain ?? -1}
                        onChange={async (e) => {
                            const local = { ...current!, alreadyInSpain: e }

                            await onSearch(local)
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 3, mb: 3
                    }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={current?.save ?? false}
                                name="hasKids"
                                color="primary"
                                onChange={async () => {
                                    const localCurrent = { ...current!, save: !current.save }

                                    await setCurrent(localCurrent)

                                    await onSaveFilter(localCurrent)
                                }}
                            />
                        }
                        label={'Salvar filtros'}
                    />
                </Box>

                {users && <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    {users.map((user, index) => <SearchResultItem key={index} user={user} />)}
                </Box>}

                <Backdrop
                    sx={{ color: '#fff' }}
                    open={submiting}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                {showMoreFilters && <SearchUsersMoreFiltersDialog
                    current={current}
                    onClose={async () => await setShowMoreFilters(false)}
                    onFilter={async (newFilter: SearchFields) => {
                        const local = { ...current, ...newFilter }

                        await onSearch(local)
                    }}
                />}

            </Container>
        </ThemeProvider>
    </SideBar>
}