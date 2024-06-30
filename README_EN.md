<h1 align="center">GALLERIA SLIDESHOW SITE</h1>

<div align="center">
 <a href="https://ivandefender.github.io/Galleria/index.html">View Project |</a>
 <a href="https://github.com/Ivandefender/Galleria">View Code</a>
</div>

<p align="center">
<img src="https://img.shields.io/badge/HTML-orange?style=for-the-badge&logo=html&logoColor=orange">
<img src="https://img.shields.io/badge/css-blue?style=for-the-badge&logo=css&logoColor=blue">
<img src="https://img.shields.io/badge/JavaScript-yellow?style=for-the-badge&logo=JavaScript&logoColor=yellow&labelColor=black">
</p>

# Start HTML

## **There are two HTML files-** index.html and art_page.html:

# Start index.html

Main page with a set of pictures that you can interact with

![index](./index.png "main_page")

## Start Header

### **Building:**

1. Site logo
2. Button to start the slide show

## End Header

## Start Main

### **Building:**

A set of 4 columns consisting of sections with the same structure but different content

Section:

- Image of the painting, its name and author

## End Main

# End index.html

# Start art_page.html

![art](./template.png "template_page (art)")

A template page on which data about a certain picture is uploaded

## Start Header

### **Building:**

1. Site logo
2. Button to stop slideshow

## End Header

## Start Main

### **Building:**

The page on which the content of the page about the `specific picture` is displayed

Section:

- Two columns (on the left - an image of the painting and the author and the name, on the right - detailed information about it)

## End Main

## Start Footer

Page switcher with pictures `(slideshow player)` and a `progress` bar

## End Footer

# End art_page.html

# End HTML

# Start CSS

## **Style.css** - basic styles for pages

### **Class specific selectors:**

Variables with colors for better orientation

```css
:root {
 --white: #fff;
 --black: #000;
 --dark-grey: #7d7d7d;
 --grey: #e5e5e5;
 --light-gray: #f3f3f3;
}
```

**Example of using a variable with color:**

```css
.art__name {
 color: var(--white);
}
```

Any class that contains a `__container` part

```css
[class*="__container"] {
 margin: 0 auto;
 max-width: 1360px;
}
```

# End CSS

# Start JS

### **There are two files -** .js and .json:

1. **Data.json** - a file with data that is uploaded to an HTML page. ``Each data in its own section''.
2. **Art_page.js** - the main file of the program.

### **Features:**

```javascript
addContent(); // general function that triggers other pages to load content

loadData(); // get data from data.json

getCurrentArtData(); // getting specific data about the picture through the link

insertArtData(); // mechanism for uploading data (creating tags, adding information to tags, changing styles)
```

### Clarification, regarding variables

1. length - the length of the array of pictures (the number of them)
2. currentArtIndex - the specific index of the picture, which is obtained from the address term of the current page
3. artsName - an array of names of paintings, to form an address string to change the content of the page
4. progressBar - getting access to the div with the progress__bar class
5. barLength - obtaining the current width of the browser
6. line - calculation of the filled part of the progress bar line

#### **Mechanism of the progress bar**

```javascript
const progressBar = document.querySelector(".progress__bar");
const barLength = Math.floor(progressBar.getBoundingClientRect().width);
const line = (barLength / length) * (Number(currentArtIndex) + 1);
progressBar.style.width = `${line}px`;
```

```html
<div class="progress">
 <div class="progress__bar"></div>
</div>
```

#### **Mechanism of the slide show player**

```javascript
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

nextBtn.addEventListener("click", () => {
 if (currentArtIndex == length - 1) {
 return;
 }
 currentArtIndex++;

 window.location.href = `./art_page.html?art=${artsName[currentArtIndex]}&&index=${currentArtIndex}`;
});

prevBtn.addEventListener("click", () => {
 if (currentArtIndex == 0) {
 return;
 }
 currentArtIndex--;

 window.location.href = `./art_page.html?art=${artsName[currentArtIndex]}&&index=${currentArtIndex}`;
});
```

```html
<div class="footer__inner-btns">
 <button class="prev slide__btn"></button>
 <button class="next slide__btn"></button>
</div>
```

# End JS

### The design was taken from [FrontendMentor.io](https://www.frontendmentor.io/challenges/galleria-slideshow-site-tEA4pwsa6);

### Developed by: [Ivan Krysak (github: Ivandefender)](https://github.com/Ivandefender);
