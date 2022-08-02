import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  Card,
  CardContent,
  CardHeader,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Uploady, {
  useItemFinishListener,
  useItemProgressListener,
} from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { InputField } from "components";

type TForm = {
  title: string;
};

type TMutation = {
  data: {
    title: string;
    featured_image: number | null;
    longitude: number | undefined;
    latitude: number | undefined;
  };
};

const GetResponseComp = ({ onUpload }: { onUpload: (x: any) => void }) => {
  useItemFinishListener((item) => {
    onUpload(item.uploadResponse);
  });
  return null;
};

const UploadStatus = () => {
  useItemProgressListener((item) => {
    console.log(item);
  });
  return <CircularProgress variant="determinate" value={50} />;
};

const NewPlace = () => {
  const [imageId, setImageId] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number>();
  const [latitude, setLatitude] = useState<number>();

  const { handleSubmit, control } = useForm<TForm>();
  const onSubmit = async (data: any) => {
    mutation.mutate({
      data: {
        title: data.title,
        featured_image: imageId,
        longitude: longitude,
        latitude: latitude,
      },
    });
  };

  const createPlace = async (data: TMutation): Promise<Response> => {
    return await axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}/api/places`,
      data
    );
  };

  const mutation = useMutation<Response, unknown, TMutation>(createPlace);

  const handleLocateMe = () => {
    if ("geolocation" in navigator) {
      /* navigator.geolocation.getCurrentPosition(function ({ coords }) {
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
      }); */
      navigator.geolocation.getCurrentPosition(
        function ({ coords }) {
          setLatitude(coords.latitude);
          setLongitude(coords.longitude);
        },
        function (error) {
          console.log(error);
        },
        {
          maximumAge: 0,
          timeout: 20000,
          enableHighAccuracy: true,
        }
      );
    } else {
      console.log("Geolocation is not available");
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography sx={{ mb: 3 }} variant="h4">
        Add place
      </Typography>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Uploady
                  destination={{
                    url: `${process.env.REACT_APP_BACKEND_SERVER}/api/upload`,
                  }}
                  accept="image/*"
                  inputFieldName="files"
                >
                  <UploadButton />
                  <Box
                    sx={{ height: "200px", width: "200px", overflow: "hidden" }}
                  >
                    <UploadPreview fallbackUrl="https://icon-library.net/images/image-placeholder-icon/image-placeholder-icon-6.jpg" />
                    <UploadStatus />
                  </Box>
                  <GetResponseComp
                    onUpload={(e: any) => setImageId(e.data[0].id)}
                  />
                </Uploady>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader subheader="Add place details" title="Place" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <InputField
                      label="Place name"
                      name="title"
                      control={control}
                      type="text"
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 2,
                }}
              >
                <Button color="primary" variant="contained" type="submit">
                  Add place
                </Button>
              </Box>
            </Card>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewPlace;
