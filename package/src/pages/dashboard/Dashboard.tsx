import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import PageWrapper from "../../components/container/PageWrapper";
import apiClient from "../../config/api-client";
import { ApiService } from "../../constants/ApiService";
import BarChartComp from "./component/BarChart";
import CustomButton from "./component/Button";
import ByDomicile from "./component/ByDomicile";
import ByUpdatedDataChart from "./component/ByUpdatedDataChart";
import GraduationTable from "./component/GraduationTable";
import PieChartComp from "./component/PieChart";
import { IData, IGeo, IGraduationData, IUpdatedData } from "./Interface";

const getTableHeight = (data) => (data.length > 3 ? "auto" : "unset");

const formatValue = (value) => {
  if (typeof value === "number") {
    return new Intl.NumberFormat("id-ID", {
          maximumFractionDigits: 0,
        }).format(value)
      ?? value.toString();
  }
  return value;
};

export default function Dashboard() {
  const [totalAlumnis, setTotalAlumnis] = useState<Number | null>(null);
  const [genders, setGenders] = useState<IData[]>([]);
  const [updatedData, setUpdatedData] = useState<IUpdatedData[]>([]);
  const [degrees, setDegrees] = useState<IData[]>([]);
  const [cities, setCities] = useState<IData[]>([]);
  const [countries, setCountries] = useState<IData[]>([]);
  const [companies, setCompanies] = useState<IData[]>([]);
  const [totalAlumniUpdate, setTotalAlumniUpdate] = useState(0);
  const [totalRegisteredAlumnis, setTotalRegisteredAlumnis] = useState(0);
  const [positionLevel, setPositionLevel] = useState<IData[]>([]);
  const [graduation, setGraduation] = useState<IGraduationData[]>([]);
  const [endowment, setEndowment] = useState<IData[]>([]);
  const [engagement, setEngagement] = useState<IData[]>([]);
  const [geography, setGeography] = useState<IGeo[]>([]);
  const [, setTotalUpdateds] = useState(0);
  const [headerPortalElement, setHeaderPortalElement] =
    useState<Element | null>(null);
  const [userLogin, setUserLogin] = useState<string | null>(null);

  useEffect(() => {
    const portalElement = document.querySelector("#header-portal-content");
    setHeaderPortalElement(portalElement);
  }, []);

  useEffect(() => {
    getGender();
    getUpdatedData();
    getUpdateAlumni();
    getDegreeAlumni();
    getCompanyCategory();
    getPositionLevel();
    getGeography();
    getByCity();
    getByCountry();
    getGraduation();
    getEndowment();
    getEngagement();
  }, []);

  const getGender = async () => {
    const response: AxiosResponse = await apiClient.get(
      ApiService.dashboardGender
    );
    const genderData = response.data;
    const countAlumni = genderData.reduce((acc, item) => acc + item.value, 0);

    const currTime = new Date();
    let formattedTime = new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(currTime);

    formattedTime = formattedTime
      .replace(" at", "")
      .replace("am", "AM")
      .replace("pm", "PM");

    setUserLogin(formattedTime);
    setTotalAlumnis(countAlumni);
    setGenders(genderData);
  };

  const getUpdatedData = async () => {
    const response = await apiClient.get(`${ApiService.dashboardUpdatedData}`);
    setUpdatedData(response.data);
  };

  const getUpdateAlumni = async () => {
    const response = await apiClient.get(`${ApiService.dashboardUpdateAlumni}`);
    const { totalAlumni, totalUpdated, totalRegisteredAlumni } = response.data;
    const updatedAlumniData = Number(
      ((totalUpdated / totalAlumni) * 100).toFixed(2)
    );
    setTotalAlumniUpdate(updatedAlumniData);
    setTotalUpdateds(totalUpdated);
    setTotalRegisteredAlumnis(totalRegisteredAlumni);
  };

  const getDegreeAlumni = async () => {
    const response: AxiosResponse = await apiClient.get(
      `${ApiService.dashboardDegree} `
    );
    setDegrees(response.data);
  };

  const getCompanyCategory = async () => {
    const response: AxiosResponse = await apiClient.get(
      `${ApiService.dashboardCompanyCategory}`
    );
    setCompanies(response.data);
  };

  const getPositionLevel = async () => {
    const response: AxiosResponse = await apiClient.get(
      `${ApiService.dashboardPositionLevel}`
    );
    setPositionLevel(response.data);
  };

  const getGeography = async () => {
    const response: AxiosResponse = await apiClient.get(
      `${ApiService.dashboardGeography}`
    );
    setGeography(response.data);
  };

  const getByCountry = async () => {
    const response: AxiosResponse = await apiClient.get(
      `${ApiService.dashboardCountry}`
    );
    setCountries(response.data);
  };

  const getByCity = async () => {
    const response: AxiosResponse = await apiClient.get(
      `${ApiService.dashboardCity}`
    );
    setCities(response.data);
  };

  const getGraduation = async () => {
    const response: AxiosResponse = await apiClient.get(
      `${ApiService.dashboardGraduation}`
    );
    setGraduation(response.data);
  };

  const getEndowment = async () => {
    const response: AxiosResponse = await apiClient.get(
      `${ApiService.dashboardEndowment}`
    );
    setEndowment(response.data);
  };

  const getEngagement = async () => {
    const response: AxiosResponse = await apiClient.get(
      `${ApiService.dashboardEngagement}`
    );
    setEngagement(response.data);
  };

  return (
    <Paper>
      <PageWrapper>
        {headerPortalElement &&
          createPortal(
            <Stack
              sx={{
                display: "inline-block",
                textAlign: "right",
                float: "right",
                width: {
                  xs: "60%",
                  sm: "65%",
                  md: "75%",
                },
              }}
            >
              Data per : {userLogin}
            </Stack>,
            headerPortalElement
          )}
        <Grid container width="100%" spacing={2} marginBottom={2}>
          {/* Total Alumni */}
          <Grid marginBottom="15px" size={{ xs: 12, sm: 6, lg: 4 }}>
            <Typography fontSize="20px" color="#F18700" fontWeight="600" noWrap>
              Total Alumni
            </Typography>
            <Stack
              width="100%"
              height="305px"
              alignItems="center"
              justifyContent="center"
              direction="row"
            >
              <PieChartComp data={genders} legendLayout="horizontal" />
              <Typography
                fontSize="30px"
                color="#0097DA"
                fontWeight="600"
                marginLeft="-5rem"
                height="250px"
              >
                {`${formatValue(totalAlumnis)}`}
                <br />
                <Typography
                  textAlign="right"
                  fontSize="18px"
                  marginTop="-0.5rem"
                >
                  Alumni
                </Typography>
              </Typography>
            </Stack>
          </Grid>

          {/* By Updated Data */}
          <Grid
            alignItems="center"
            height="350px"
            marginBottom="15px"
            size={{ xs: 12, sm: 6, lg: 5 }}
          >
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
              width="100%"
              height="350px"
            >
              <Typography fontSize="20px" fontWeight="600" color="#F18700">
                By Updated Data
              </Typography>
              <ByUpdatedDataChart data={updatedData} />
            </Stack>
          </Grid>

          {/* Update Alumni Data */}
          <Grid maxHeight="200px" marginBottom="15px" size={{ xs: 12, sm: 6, lg: 3 }}>
            <Typography noWrap color="#F18700" fontWeight="600" fontSize="20px">
              Update Alumni Data
            </Typography>
            <Typography noWrap color="#0097DA" fontSize="16px">
              Updated Alumni Data:{" "}
              <span style={{ fontWeight: "bold", fontSize: "22px" }}>
                {`${totalAlumniUpdate}%`}
              </span>
            </Typography>
            <Typography noWrap color="#0097DA" fontSize="16px">
              Registered Alumni App:{" "}
              <span style={{ fontWeight: "bold", fontSize: "22px" }}>
                {`${formatValue(totalRegisteredAlumnis)}`}
              </span>
            </Typography>
          </Grid>
          <Grid
            justifySelf="center"
            alignSelf="center"
            sx={{ marginX: "auto" }}
          >
            <CustomButton url="/dashboard/updated-data" />
          </Grid>
        </Grid>

        <Grid container width="100%" spacing={2} marginBottom="15px">
          {/* By Degree */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} height="550px" marginBottom="15px">
            <Typography
              fontSize="20px"
              fontWeight="600"
              color="#F18700"
              width="100%"
              textAlign="center"
            >
              By Degree
            </Typography>
            <Stack width="100%" height="80%">
              <PieChartComp data={degrees} legendLayout="horizontal" />
            </Stack>
            <Stack width="100%" marginTop="34px">
              <CustomButton url="/dashboard/degree" />
            </Stack>
          </Grid>

          {/* By Company Category */}
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} height="550px" marginBottom="15px">
            <Typography
              fontSize="20px"
              fontWeight="600"
              color="#F18700"
              textAlign="center"
            >
              By Company Category
            </Typography>
            <Stack width="100%" height="80%">
              <PieChartComp data={companies} legendLayout="horizontal" />
            </Stack>
            <Stack width="100%" marginTop="34px">
              <CustomButton url="/dashboard/company" />
            </Stack>
          </Grid>

          {/* By Position Level */}
          <Grid height="550px" size={{ xs: 12, sm: 9, lg: 4 }} marginBottom="15px" marginX="auto">
            <Typography
              fontSize="20px"
              fontWeight="600"
              color="#F18700"
              textAlign="center"
            >
              By Position Level
            </Typography>
            <Stack width="100%" height="80%">
              <PieChartComp data={positionLevel} maxLegendItems={8} legendLayout="horizontal" />
            </Stack>
            <Stack width="100%" marginTop="34px">
              <CustomButton url="dashboard/job" />
            </Stack>
          </Grid>
        </Grid>

        {/* ByDomicile */}
        <Grid container width="100%" spacing={1} marginBottom="15px">
          {/* Map Section */}
          <Grid
            size={{ xs:12, sm: 8 }}
            // alignItems="center"
            // justifyContent="center"
            // marginBottom="20px"

            height="635px"
            paddingRight={{
              xs: 0,
              sm: 1,
            }}
          >
            <Typography
              fontSize="20px"
              fontWeight="600"
              color="#F18700"
              textAlign="center"
              marginBottom="15px"
            >
              By Domicile
            </Typography>
            <Stack width="100%" height="100%">
              <ByDomicile alumniData={geography} />
            </Stack>
          </Grid>

          {/* Table Section */}
          <Grid size={{ xs:12, sm: 4 }}>
            {/* Country Table */}
            <Stack width="100%" alignItems="center" gap={2} height="300px">
              <Typography
                fontSize="20px"
                fontWeight="600"
                color="#F18700"
                // marginTop={2}
              >
                By Country (Top 5)
              </Typography>
              <TableContainer
                component={Paper}
                style={{
                  height: "100%",
                  maxHeight: getTableHeight(countries),
                  overflow: countries.length > 3 ? "auto" : "unset",
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          backgroundColor: "#F2F2F2",
                          fontWeight: "bold",
                        }}
                      >
                        Country
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#F2F2F2",
                          fontWeight: "bold",
                          width: "37.5%",
                        }}
                      >
                        Total Graduated
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {countries.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} align="center">
                          No Data
                        </TableCell>
                      </TableRow>
                    ) : (
                      countries.map((country) => (
                        <TableRow key={country.id}>
                          <TableCell>{country.name}</TableCell>
                          <TableCell>{formatValue(country.value)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>

            {/* City Table */}
            <Stack
              width="100%"
              alignItems="center"
              gap={2}
              height="300px"
              marginTop="15px"
            >
              <Typography fontSize="20px" fontWeight="600" color="#F18700">
                By City (Top 5)
              </Typography>
              <TableContainer
                component={Paper}
                style={{
                  height: "100%",
                  maxHeight: getTableHeight(cities),
                  overflow: cities.length > 3 ? "auto" : "unset",
                }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          backgroundColor: "#F2F2F2",
                          fontWeight: "bold",
                        }}
                      >
                        City
                      </TableCell>
                      <TableCell
                        style={{
                          backgroundColor: "#F2F2F2",
                          fontWeight: "bold",
                          width: "37.5%",
                        }}
                      >
                        Total Graduated
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cities.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={2} align="center">
                          No Data
                        </TableCell>
                      </TableRow>
                    ) : (
                      cities.map((city) => (
                        <TableRow key={city.id}>
                          <TableCell>{city.name}</TableCell>
                          <TableCell>{formatValue(city.value)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
            <Stack width="100%" marginTop="15px">
              <CustomButton url="/dashboard/domicile" />
            </Stack>
          </Grid>
        </Grid>
        <Grid container width="100%" spacing={2}>
          <Grid
            size={{ xs:12, sm: 5 }}
            marginBottom="15px"
            height="600px"
            marginTop={2}
            paddingTop={0.5}
          >
            <Typography
              fontSize="20px"
              fontWeight="600"
              color="#F18700"
              textAlign="center"
              marginBottom="15px"
            >
              By Graduation Year
            </Typography>
            <Stack width="100%" height="75%">
              <GraduationTable data={graduation} />
            </Stack>
            <Stack width="100%" marginTop="15px">
              <CustomButton url="/find-alumni" />
            </Stack>
          </Grid>

          {/* Right Section: Chart */}
          <Grid size={{ xs:12, sm: 7 }} height="600px">
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
              width="100%"
              padding={2}
              height="50%"
            >
              <Typography fontSize="20px" fontWeight="600" color="#F18700">
                Engagement Achievement
              </Typography>
              <BarChartComp data={engagement} currencySeparator />
              <Stack width="100%" marginTop="15px">
                <CustomButton url="/engagement/view" />
              </Stack>
            </Stack>
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
              width="100%"
              padding={2}
              height="50%"
            >
              <Typography fontSize="20px" fontWeight="600" color="#F18700">
                Endowment Achievement
              </Typography>
              <BarChartComp data={endowment} currencySeparator />
              <Stack width="100%" marginTop="15px">
                <CustomButton url="/endowment/view" />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </PageWrapper>
    </Paper>
  );
}
