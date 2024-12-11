# Responsive Cart Page Implementation

## Step 1: Create the HTML Structure

Start with creating the layout of the cart page by dividing it into sections.

### Header Section

Add a header containing:
- A logo placeholder (`Marmeto`).
- Navigation links (`Home`, `Shop`, `About`, `Contact`).
- A search icon and cart icon on the right.

### Breadcrumb Navigation

Add a breadcrumb section below the header showing `Home > Cart`.

### Cart Content Area

Use a two-column layout:
- **Left Column:** A list of cart items with details such as:
  - Product image.
  - Product name (e.g., "Asgaard sofa").
  - Price (from API `presentment_price`).
  - Quantity input field.
  - Subtotal per product.
  - Trash icon for item removal.
- **Right Column:** Cart totals box with:
  - Subtotal (from API `original_total_price`).
  - Total price.
  - A "Check Out" button.

### Footer Section

Include service highlights (e.g., "High Quality," "Warranty Protection") with icons and descriptions.

---

## Step 2: Style the Page with CSS

Ensure the design matches the provided Figma reference.

### Styles to Implement:

- **Header:**
  - Fixed at the top with a clean navigation bar.
  - Logo aligned to the left and icons on the right.

- **Cart Content:**
  - A two-column layout for desktop.
  - Stack columns vertically for mobile.
  - Highlight borders, spacing, and font styles.

- **Cart Totals:**
  - Display in a box on the right for desktop and below items on smaller screens.
  - Use bold fonts for total price.

- **Footer:**
  - Icons with descriptive text, evenly spaced in a row.

### Responsiveness

Add media queries for the following breakpoints:
- **768px** (tablet).
- **480px** (mobile).

---

## Step 3: Fetch and Display Data Using JavaScript

### Fetch Data

- Use `fetch()` to retrieve cart details from the API.
- Parse the JSON response.

### Populate Cart Items

Iterate over `items` in the API response to display:
- Product image (`image`).
- Name (`title`).
- Price (`presentment_price`).
- Quantity (default to `quantity` from API, editable).
- Subtotal (price × quantity).

### Display Cart Totals

- Calculate and display the `subtotal` and `total`.

### Currency Formatting

- Format prices as Indian Rupees (`₹`) using `Intl.NumberFormat`.

---

## Step 4: Add Functionality

### Quantity Update

- Listen to changes in the quantity field.
- Recalculate and update:
  - Subtotal for that product.
  - Total price in the "Cart Totals" section.

### Remove Item

- Add an event listener to the trash icon.
- On click:
  - Remove the product from the displayed list.
  - Update cart totals.

### Check Out Button

- Add a `click` event handler for checkout functionality (log the current cart state for now).

---

## Step 5: Bonus Features (Optional)

### Local Storage

- Save cart data in `localStorage` to persist cart state after page refresh.

### Confirmation Modal

- Add a confirmation popup before removing an item.

### Loader Animation

- Display a loading spinner while fetching cart data.

---

## Sample Code Snippets

### Fetching and Displaying Data

```javascript
fetch("https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889")
  .then((response) => response.json())
  .then((data) => {
    const cartItems = data.items;
    const cartContainer = document.getElementById("cart-items");

    cartItems.forEach((item) => {
      const cartRow = `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}">
          <div>
            <h4>${item.title}</h4>
            <p>Price: ₹${(item.presentment_price / 100).toFixed(2)}</p>
            <input type="number" value="${item.quantity}" min="1" class="item-quantity">
            <p>Subtotal: ₹${(item.presentment_price * item.quantity / 100).toFixed(2)}</p>
          </div>
          <button class="remove-item">🗑</button>
        </div>`;
      cartContainer.innerHTML += cartRow;
    });
  });


https://s3-alpha-sig.figma.com/img/2727/769b/a74736d502746301ed573ed8940fc322?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eQ~Ob1JfIzwztu98MeKCLhmFDsSaM5jYcgxP-Ly2Tr5OwtVarco-JLG09CZRJS3Eee~widDH5oBu4OSsPtHIBXXHT5Da5WK3~8pw70It-wNPaXbA3z89y1OWl-aRWqj7R1jh4e287I6kIxtmhxKF2Zo9mxw9aZLY6Gp4Kmrbnm2Gneb2BxfQxC7ptSZeJUh5RDV59-ptrsMitGTbiE5XhDw8Xls5P9r040aa8oRrVYD93cS9NlpSDQcPMnSym9P5M720gfKsgO4kLj8rnpsA~e1~iIYm0rOayKgsXxfMHTO-HATWs5i1wEYPH3MEPYRqwwFWLNaWZ33XutpZcDBKeA__

https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fcart&psig=AOvVaw00wzlWq0WiYxwbZxmlHZQ0&ust=1734025412790000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCID925mioIoDFQAAAAAdAAAAABAEhttps://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fcart&psig=AOvVaw00wzlWq0WiYxwbZxmlHZQ0&ust=1734025412790000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCID925mioIoDFQAAAAAdAAAAABAE