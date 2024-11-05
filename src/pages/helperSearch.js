import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Grid2, IconButton, Menu, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu";

import { Header } from "../components/mui";
import HelperCard from "../components/helperCard"
import HelperSearchBar from "../components/helperSearchBar";

import { searchForHelper } from "../api/helperSearch";
import { publicOrganizationRequest } from "../api/public";
import { cleanHelperSearch, processAgencyData } from "../services/helperSearch";

import { useAuth } from "../services/authProvider";

function HelperSearch() {
    const [search, setSearch] = useState({});
    const [results, setResults] = useState([]);
    const [agencies, setAgencies] = useState({});

    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const auth = useAuth();
    const navigate = useNavigate();

    async function getData(params) {
        params = cleanHelperSearch(params, agencies);
        let data = await searchForHelper(auth.checkLoggedIn(), params).then((res)=>{
            if (res === 'error') return navigate("/account");
            return res;
        });
        setResults(data);
    }

    function setSearchParam(param, value) {
        search[param] = value;
        setSearch(search);
        console.log(search);
        getData(search);
    }

    useEffect(() => {
        const getAgencyData = async () => {
            let agencyData = await publicOrganizationRequest();
            agencyData = processAgencyData(agencyData);
            setAgencies(agencyData);    
        }
        
        getData({});
        getAgencyData();
    },[])

    return (<>
        <Header text={`${results.length} Maids found in Singapore`} />
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:2
        }}>
            <Box sx={{
                display:'flex',
                background: 'white',
                position: 'sticky',
                px:1,
                top: 0,
                zIndex:10
            }}>
                <Box sx={{
                    display:{xs:'none', md:'flex'},
                    alignItems: 'center',
                    gap:2,
                    width:'100%'
                }}>
                    <HelperSearchBar setSearchParam={setSearchParam} agencies={agencies} menu={false} />
                </Box>
                <Box sx={{display: {xs: 'flex', md: 'none', alignItems:'center'}}}>
                    <IconButton
                        size="large"
                        aria-label="Menu Appbar"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5">Search</Typography>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                        keepMounted
                        transformOrigin={{vertical: 'top', horizontal: 'left'}}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{ display: {xs:'flex', md:'none'}}}
                    >
                        <Box sx={{px:1}}>
                            <HelperSearchBar setSearchParam={setSearchParam} agencies={agencies} nemu={true} />    
                        </Box>
                    </Menu>
                </Box>
            </Box>
            
            <Grid2 container spacing={2} sx={{px:1}}>
                {results.map((helper) => {
                    return (<Grid2 key={helper['id']} size={{lg:3, md:4, sm:4, xs:6}}>
                        <HelperCard key={helper['id']} data={helper}/>
                    </Grid2>)
                })}
            </Grid2>
        </Box>
    </>)
}

export default HelperSearch