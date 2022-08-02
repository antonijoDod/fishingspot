import React, { useState } from "react";
import Uploady, { useItemFinishListener } from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import { Box, Card, CardContent } from "@mui/material";

const GetResponseComp = ({ onUpload }: { onUpload: (x: any) => void }) => {
  useItemFinishListener((item) => {
    onUpload(item.uploadResponse);
  });
  return null;
};

const PlaceImage = ({
  onUploadId,
  ...rest
}: {
  onUploadId: (e: number) => void;
}) => {
  const [imageId, setImageId] = useState<number | null>(null);

  return (
    <Card {...rest}>
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
            <Box sx={{ height: "200px", width: "200px", overflow: "hidden" }}>
              <UploadPreview />
            </Box>
            <GetResponseComp onUpload={(e: any) => onUploadId(e.data[0].id)} />
          </Uploady>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlaceImage;
