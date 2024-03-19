import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";


interface Place {
    place_id: string;
    display_name: string;
}

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails",
};

interface SearchBoxProps {
    selectPosition: Place | null;
    setSelectPosition: React.Dispatch<React.SetStateAction<Place | null>>;
}

const SearchBox: React.FC<SearchBoxProps> = ({ selectPosition, setSelectPosition }) => {
    const [searchText, setSearchText] = useState<string>("");
    const [listPlace, setListPlace] = useState<Place[]>([]);

    const handleSearch = () => {
        const params = {
            q: searchText,
            format: "json",
            addressdetails: "1",
            polygon_geojson: "0",
        };
        const queryString = new URLSearchParams(params).toString();
        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow",
        };
        fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setListPlace(result);
            })
            .catch((err) => console.log("err: ", err));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                    <TextField
                        style={{ width: "100%" }}
                        value={searchText}
                        onChange={(event) => {
                            setSearchText(event.target.value);
                        }}
                    />
                </div>
                <div style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>
            </div>
            <div>
                <List component="nav" aria-label="main mailbox folders">
                    {listPlace.map((item) => (
                        <div key={item.place_id}>
                            <ListItemButton
                                onClick={() => {
                                    setSelectPosition(item);
                                }}
                            >
                                <ListItemIcon>
                                    <img
                                        src="./placeholder.png"
                                        alt="Placeholder"
                                        style={{ width: 38, height: 38 }}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={item.display_name} />
                            </ListItemButton>
                            <Divider />
                        </div>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default SearchBox;
