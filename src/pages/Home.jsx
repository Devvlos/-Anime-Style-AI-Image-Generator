import React, { useState, useEffect } from "react";
import { fetchImages } from "../services/model-api";
import imagee from "../Images/loader.gif";
import Eximage from "../Images/homepage.jpg";

const Home = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [imageResult, setImageResult] = useState(null);
  const [character, setCharacter] = useState("");
  const [item, setItem] = useState("");

  let promptQuery = `anime of ${character} with ${item}`;

  const handleSearch = (event) => {
    setCharacter(event.target.value);
  };
  const handleSearch2 = (event) => {
    setItem(event.target.value);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    fetchData();
  };
  const share = () => {
    if (navigator.share) {
      // Browser supports native share api
      navigator
        .share({
          text: `Ever Wonder How ${character} with ${item} Would Look Like Together If They Were In A Anime Show? Now You Could Vist `,
          url: "",
        })
        .then(() => {})
        .catch((err) => console.error(err));
    } else {
      // Fallback
      alert(
        "The current browser does not support the share function. Please, manually share the link"
      );
    }
  };

  const fetchData = async () => {
    try {
      setShowLoader(true);

      const imageBlob = await fetchImages(promptQuery);

      const fileReaderInstance = new FileReader();
      // This event will fire when the image Blob is fully loaded and ready to be displayed
      fileReaderInstance.onload = () => {
        let base64data = fileReaderInstance.result;
        setImageResult(base64data);
      };
      // Use the readAsDataURL() method of the FileReader instance to read the image Blob and convert it into a data URL
      fileReaderInstance.readAsDataURL(imageBlob);
      setShowLoader(false);
    } catch (error) {
      // Handle error
      console.error("Error fetching images from API:", error);
      setShowLoader(false);
    }
  };

  return (
    <div class="flex flex-col items-center justify-center min-h-screen bg-black dark:bg-black">
      <div class="max-w-2xl w-full px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div class="text-center space-y-2">
          <h1 class="text-3xl font-bold tracking-tight text-muted-foreground dark:text-white">
            Lado Rani - Anime Style AI Image Generator
          </h1>
          <p class="text-muted-foreground dark:text-white">
            Enter any two things you wanna see together like character, person,
            animal, or food and let our LADO RANI generate an anime style image
            for you.
          </p>
        </div>
        <input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchData();
            }
          }}
          onChange={handleSearch}
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
          type="text"
          placeholder="Enter First Thing..."
        />
        <div class="flex items-center space-x-4">
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchData();
              }
            }}
            onChange={handleSearch2}
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
            type="text"
            placeholder="Enter Second Thing..."
          />
          <button
            onClick={handleGenerate}
            id="btn"
            class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible: focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-500 md:bg-yellow-500 hover:bg-yellow-500 h-11 rounded-md px-8"
          >
            Generate
          </button>
        </div>
        <div class="bg-card dark:bg-muted rounded-xl overflow-hidden">
          {showLoader ? (
            <img
              src={imagee}
              width="800"
              height="600"
              alt="example"
              class="w-full h-auto object-cover"
              styles="aspect-ratio:800/600;object-fit:cover"
            />
          ) : (
            <>
              {imageResult ? (
                <>
                  <img
                    src={imageResult}
                    width="800"
                    height="600"
                    alt={promptQuery}
                    class="w-full h-auto object-cover"
                    styles="aspect-ratio:800/600;object-fit:cover"
                  />
                  <br />
                  <a download={promptQuery} href={imageResult}>
                    {" "}
                    <button
                      id="btn"
                      class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible: focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-500 md:bg-yellow-500 hover:bg-yellow-500 h-11 rounded-md px-8"
                    >
                      Download
                    </button>{" "}
                  </a>
                  <a onClick={() => share()}>
                    {" "}
                    <button
                      id="btn"
                      class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible: focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-500 md:bg-yellow-500 hover:bg-yellow-500 h-11 rounded-md px-8"
                    >
                      Share
                    </button>{" "}
                  </a>
                </>
              ) : (
                <>
                  <img
                    src={Eximage}
                    width="800"
                    height="600"
                    alt="Example Image"
                    class="w-full h-auto object-cover"
                    styles="aspect-ratio:800/600;object-fit:cover"
                  />{" "}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
