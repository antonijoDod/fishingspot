import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Uploady, { useItemFinishListener } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

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
      navigator.geolocation.getCurrentPosition(function ({ coords }) {
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
      });
    } else {
      console.log("Not Available");
    }
  };

  return (
    <Box>
      <Typography variant="h5" component="h5">
        Add new place
      </Typography>
      <Grid container>
        <Grid item>
          <Uploady
            destination={{
              url: `${process.env.REACT_APP_BACKEND_SERVER}/api/upload`,
            }}
            accept="image/*"
            inputFieldName="files"
          >
            <UploadButton />
            <Box sx={{ height: "200px", width: "200px", overflow: "hidden" }}>
              <UploadPreview />
            </Box>
            <GetResponseComp onUpload={(e: any) => setImageId(e.data[0].id)} />
          </Uploady>

          <Button
            sx={{ marginY: "1rem" }}
            variant="contained"
            onClick={handleLocateMe}
          >
            Locate me
          </Button>

          <form>
            <Controller
              name="title"
              defaultValue=""
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  onChange={onChange}
                  value={value}
                  label="Title"
                />
              )}
            />

            <Button
              variant="contained"
              sx={{ marginTop: "1rem" }}
              onClick={handleSubmit(onSubmit)}
              endIcon={<SendIcon />}
              disabled={mutation.isLoading}
            >
              Submit
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewPlace;
