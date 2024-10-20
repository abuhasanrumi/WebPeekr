# WebPeekr

**WebPeekr** is a powerful Chrome extension designed to help developers and designers analyze and interact with websites in real time. It extracts critical styling information such as fonts, sizes, weights, and colors from web pages. With WebPeekr, you can efficiently gather and manage web assets like images, SVGs, and more, making it a handy tool for anyone working with frontend design and development.

## Features

- **Font Inspector**: Extracts and lists all the fonts used on a web page, excluding system fonts (such as `-apple-system`, `system-ui`, etc.), while removing duplicates. It also provides insights into font sizes, weights, and color codes, giving you a detailed view of a site's typography.
- **Asset Manager**: Categorizes and displays images, Base64-encoded images, and SVGs used on a web page. You can download these assets directly by simply clicking on them. The extension supports multiple formats such as `.jpg`, `.png`, `.gif`, `.webp`, and `.svg`.

- **Visual Feedback**: On hovering over assets (images, SVGs, Base64 images), a download icon appears as an overlay to signal to the user that the asset can be downloaded. This improves user experience by making interactions intuitive.

- **Popup Interface**: A user-friendly Chrome extension popup interface with easy-to-access features. The design includes a header with quick access to functionalities like font inspection and asset management.

## Installation

1. Clone or download this repository.
2. Go to `chrome://extensions/` in your Chrome browser.
3. Enable "Developer mode" in the top-right corner.
4. Click "Load unpacked" and select the directory where you downloaded the extension.
5. The WebPeekr icon will appear in your browser toolbar.

## Usage

1. Navigate to any website you wish to inspect.
2. Click the **WebPeekr** icon in your Chrome toolbar.
3. In the popup, you'll be able to explore fonts, images, and SVGs used on the page.
4. Hover over any image or SVG to reveal the download icon and click to save the asset to your device.

## Technologies

- **React**: For the user interface of the extension's popup.
- **Chrome Extension API**: To interact with browser tabs, extract web assets, and manipulate web content.
- **JavaScript**: For logic and functionalities like downloading assets and parsing font and image data.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository, make changes, and submit a pull request. Suggestions and feature requests are also welcome!
