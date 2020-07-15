import { refs } from "./refs.js";
import products from "./pages/products.js";
import profile from "./pages/profile.js";
import auth from "./pages/auth.js";


const navigation = () => {
  refs.content.innerHTML = products();

  const setActivePage = (target) => {
    const activePage = document.querySelector('.activePage');
    activePage.classList.remove('activePage');
    target.classList.add('activePage');
  }

  const getPage = (e) => {
    if (e.target.dataset.page) {
      const page = e.target.dataset.page;

      switch (page) {
        case "products":
          refs.content.innerHTML = products();
          setActivePage(e.target);
          break;
        case "profile":
          refs.content.innerHTML = profile();
          setActivePage(e.target);
          break;
        case "auth":
          refs.content.innerHTML = auth();
          setActivePage(e.target);
          break;
        default:
          refs.content.innerHTML = products();
          setActivePage(e.target);
          break;
      }
      // (page === "products") && (refs.content.innerHTML = products());
      // (page === "profile") && (refs.content.innerHTML = profile());
      // (page === "auth") && (refs.content.innerHTML = auth());
    } else return
  }
  refs.navigationList.addEventListener('click', getPage)
}

export default navigation;
