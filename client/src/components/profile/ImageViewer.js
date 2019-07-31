import React from "react";
import { RViewer, RViewerTrigger } from "react-viewerjs";
import _ from "lodash";

const OneImagePreview = ({ sourceUrl }) => {
  let options = {
    toolbar: {
      //Since there is only one picture, let's hide "prev" and "next"
      prev: false,
      next: false
    }
  };
  return (
    <RViewer options={options} imageUrls={sourceUrl}>
      <RViewerTrigger>
        <img src={sourceUrl} />
      </RViewerTrigger>
    </RViewer>
  );
};

const renderImages = images => {
  return _.map(images, image_url => {
    return <OneImagePreview key={image_url} sourceUrl={image_url} />;
  });
};

const BaseDemoComponent = ({ images }) => {
  return <div className="imageviewer">{renderImages(images)}</div>;
};

export default BaseDemoComponent;
