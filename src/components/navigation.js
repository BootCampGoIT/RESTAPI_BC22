import { refs } from "./refs";
import productsPage from "./pages/productsPage";
import profilePage from "./pages/profilePage";
import authPage from "./pages/authPage";


const navigation = () => {
  refs.content.innerHTML = productsPage();

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
          productsPage();
          setActivePage(e.target);
          break;
        case "profile":
          profilePage();
          setActivePage(e.target);
          break;
        case "auth":
          refs.content.innerHTML = authPage();
          setActivePage(e.target);
          break;
        default:
          refs.content.innerHTML = productsPage();
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
