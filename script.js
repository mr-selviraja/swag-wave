const cotainerCollections = document.querySelector(".collections-container");

const getHtmlForCollection = (categoryList) => {
  return categoryList.map((category) => {
    return `
        <article class="collection-card text-regular">
            <img
                src=${category.image}
                alt="collection card 1"
            />

            <p class="collection-card__title">
                ${category.title}
            </p>

            <div class="collection-card__purchase">
                <p class="collection-card__purchase--price">$${category.price}</p>
                <p class="collection-card__purchase--rating">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
                </p>
            </div>

            <div style="display: flex; justify-content: space-between; gap: 0.5rem; margin-top: 1rem;">
                <a href="#" class="btn btn-dark btn-dark-outline btn-rounded">
                    <i class="fa-regular fa-heart"></i>
                </a>
                <a href="#" class="btn btn-dark btn-rounded" style="flex-grow: 1">
                    <i class="fa-solid fa-cart-shopping"></i> &nbsp;Purchase
                </a>
            </div>
        </article>
    `;
  });
};

fetch("https://fakestoreapi.com/products/categories")
  .then((res) => res.json())
  .then((data) => {
    let categories = data;

    categories.map((category) => {
      fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
          const category = data.slice(0, 4);
          const categoryName = category[0].category;

          cotainerCollections.innerHTML += `
            <div class="collection">
                <h2>&rarr; &nbsp;${
                  categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
                }</h2>
                <div class="collection-cards">
                    ${getHtmlForCollection(category).join("")}
                </div>
            </div>
        `;
        });
    });
  });
