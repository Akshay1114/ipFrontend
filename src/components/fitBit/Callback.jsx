import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { wingWiseApi } from "../../utils/AxiosInstance";

const Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const authCode = params.get("code");

        if (authCode) {
            // axios.post("http://localhost:5001/api/sleepData/get-access-token", { code: authCode })
            wingWiseApi.post("/sleepData/get-access-token", { code: authCode })
                .then(response => {
                    localStorage.setItem("fitbit_access_token", response.data.access_token);
                    navigate("/display-sleep");
                })
                .catch(error => console.error("Error getting token:", error));
        }
    }, [navigate]);

    return <h2>Processing Fitbit Login...</h2>;
};

export default Callback
