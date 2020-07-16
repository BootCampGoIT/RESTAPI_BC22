import { refs } from "./refs";
import productsPage from "./pages/productsPage";
import profilePage from "./pages/profilePage";
import authPage, { setActiveLinks } from "./pages/authPage";



const navigation = () => {
  productsPage();
  if (localStorage.getItem('user')) {
    setActiveLinks()
  }
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
          authPage();
          setActivePage(e.target);
          break;
        case "signout":
          localStorage.clear();
          setActivePage(e.target);
          setActiveLinks();
          break;
        default:
          productsPage();
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
