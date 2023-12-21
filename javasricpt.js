let categoryListContainer = document.getElementById("productsCategoryList");
let productsListContainer = document.getElementById("productsList");
let inputSearch = document.getElementById("inputSearch");

const renderProductCard = (products) => {
  // console.log(products);
  productsListContainer.textContent = "";
  products.map((eachProduct) => {
    const {
      id,
      badgeText,
      compareAtPrice,
      image,
      price,
      secondImage,
      title,
      vendor,
    } = eachProduct;
    const discount = parseInt(
      ((compareAtPrice - price) / compareAtPrice) * 100
    );

    const productListItem = document.createElement("li");
    productListItem.setAttribute("id", id);
    productListItem.classList.add("product-list-item");
    productsListContainer.appendChild(productListItem);

    if (badgeText !== null) {
      const productBadge = document.createElement("p");
      productBadge.classList.add("product-badge");
      productBadge.textContent = badgeText;
      productListItem.appendChild(productBadge);
    }

    const productImg = document.createElement("img");
    productImg.classList.add("product-image");
    productImg.src = image;
    productListItem.appendChild(productImg);

    const productTitle = document.createElement("h1");
    const productTitleVendor = document.createElement("span");
    productTitle.classList.add("product-title");
    productTitleVendor.classList.add("product-title-vendor");
    productTitle.textContent = title + " . ";
    productTitleVendor.textContent = vendor;
    productTitle.appendChild(productTitleVendor);
    productListItem.appendChild(productTitle);

    const productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.textContent = "Rs " + price;
    productListItem.appendChild(productPrice);

    const productOriginalPrice = document.createElement("span");
    productOriginalPrice.classList.add("product-original-price");
    productOriginalPrice.textContent = compareAtPrice;
    productPrice.appendChild(productOriginalPrice);

    const productDiscount = document.createElement("span");
    productDiscount.classList.add("product-discount");
    productDiscount.textContent = discount + "% Off";
    productPrice.appendChild(productDiscount);

    const productAddToCartButton = document.createElement("button");
    productAddToCartButton.classList.add("add-to-cart-button");
    productAddToCartButton.textContent = "Add to Cart";
    productListItem.appendChild(productAddToCartButton);
  });
};

const renderCategoryItem = (item) => {
  const { categoryName, categoryProducts } = item;
  let activeClassname = categoryName === "Men" ? "active" : "not-active";

  let productListItem = document.createElement("li");
  productListItem.classList.add("category-list-item");

  let productButton = document.createElement("button");
  productButton.setAttribute("id", categoryName);
  productButton.classList.add("category-button", activeClassname);
  productButton.textContent = categoryName;

  productButton.addEventListener("click", () => {
    const allCategoryButtons = document.querySelectorAll(".category-button");
    allCategoryButtons.forEach((button) => {
      button.classList.remove("active");
    });
    productButton.classList.add("active");
    renderProductCard(categoryProducts);
  });

  productListItem.appendChild(productButton);
  categoryListContainer.appendChild(productListItem);
};

const getProducts = async () => {
  try {
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );
    const data = await response.json();
    // console.log(data);
    const { categories } = data;
    const formattedData = categories.map((each) => ({
      categoryName: each.category_name,
      categoryProducts: each.category_products.map((eachProduct) => ({
        id: eachProduct.id,
        title: eachProduct.title,
        price: eachProduct.price,
        compareAtPrice: eachProduct.compare_at_price,
        vendor: eachProduct.vendor,
        badgeText: eachProduct.badge_text,
        image: eachProduct.image,
        secondImage: eachProduct.second_image,
      })),
    }));
    formattedData.map((each) => {
      renderCategoryItem(each);
    });
    renderProductCard(formattedData[0].categoryProducts);
  } catch (error) {
    console.log(error);
  }
};

getProducts();
