import { useState } from "react";
import {
  Grid,
  Box,
  Button,
  CircularProgress,
  Pagination,
  Stack,
} from "@mui/material";
import { PlaceCard } from "components";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { TPlaces } from "types/places";
import { useQuery } from "@tanstack/react-query";

const Places = () => {
  const [page, setPage] = useState<number>(1);

  const getPlaces = async (): Promise<TPlaces> => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER}/api/places?populate=*&pagination[page]=${page}&pagination[pageSize]=8`
    );
    return response.data;
  };

  const {
    data: placesData,
    isLoading: placesIsLoading,
    isError: placesIsError,
  } = useQuery(["places", page], getPlaces);

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <>
      <Box
        sx={{
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box></Box>
        <Button variant="contained" component={RouterLink} to="/places/new">
          New
        </Button>
      </Box>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          {placesIsLoading && <CircularProgress />}
          {placesIsError && "Error is occurred"}
          {placesData !== undefined && placesData?.data.length > 0 ? (
            <>
              {placesData?.data.map((place) => (
                <Grid item xs={6} md={3} key={place.id}>
                  <PlaceCard
                    title={place.attributes.title}
                    imageUrl={
                      place.attributes.featured_image.data?.attributes.formats
                        .thumbnail.url
                    }
                  />
                </Grid>
              ))}
            </>
          ) : (
            "No places"
          )}
        </Grid>
        <Pagination
          count={placesData?.meta.pagination.pageCount}
          page={placesData?.meta.pagination.page || 1}
          onChange={handlePaginationChange}
        />
      </Stack>
    </>
  );
};

export default Places;
