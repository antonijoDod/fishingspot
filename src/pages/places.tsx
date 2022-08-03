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
import { useGetPlaces } from "hooks/usePlace";

const Places = () => {
  const [page, setPage] = useState<number>(1);
  const { places, isError, isLoading } = useGetPlaces(page);

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
          {isLoading && <CircularProgress />}
          {isError && "Error is occurred"}
          {places !== undefined && places?.data.length > 0 ? (
            <>
              {places?.data.map((place) => (
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
          count={places?.meta.pagination.pageCount}
          page={places?.meta.pagination.page || 1}
          onChange={handlePaginationChange}
        />
      </Stack>
    </>
  );
};

export default Places;
