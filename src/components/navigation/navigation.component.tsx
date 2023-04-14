import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux-ts/hooks";
import { useState } from "react";
import { selectCurrentPage, changePage } from "../../redux-ts/slices/navigation.slice";

export enum NavigationPages {
    Saloon,
    Kitchen,
    Configurations
}

export default function LocalNavigator() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const [value, setValue] = useState(useAppSelector(selectCurrentPage));
    
    async function DoNavigation(newValue: number) {
        await InternalDoNavigation(newValue);
    }

    const InternalDoNavigation = async (value: number) => {
        await setValue(value);
        let path = '/'
        switch (value) {
            case NavigationPages.Saloon:
                path = '/'
                break;
            case NavigationPages.Kitchen:
                path = '/kitchen';
                break;

            case NavigationPages.Configurations:
                path = '/config';
                break;

            default:
                break;
        }

        dispatch(changePage(value))
        await navigate(path);
    }

    return {
        DoNavigation
    }
}