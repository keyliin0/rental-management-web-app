import React from "react";
import { RViewer, RViewerTrigger } from "react-viewerjs";

const OneImagePreview = () => {
  let sourceUrl =
    "https://89239-660555-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2018/10/13-11.jpg";
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

const BaseDemoComponent = () => {
  return (
    <div className="imageviewer">
      <OneImagePreview />
      <OneImagePreview />
      <OneImagePreview />
      <OneImagePreview />
      <OneImagePreview />
      <OneImagePreview />
      <OneImagePreview />
    </div>
  );
};

export default BaseDemoComponent;
