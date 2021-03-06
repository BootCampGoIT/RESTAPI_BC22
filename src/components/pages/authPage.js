import { refs } from "../refs";
import { authForm } from '../authForm';
import { signUp, signIn, addUserToDB, getUserDbId } from '../services';
import productsPage from '../pages/productsPage';
import { shop } from "../shop";

const user = {
  email: '',
  password: ''
}

const setDefaultSettings = () => {
  user.email = '';
  user.password = ''
  document.forms.authForm.reset()
}

export const setActiveLinks = () => {
  refs.authLink.classList.toggle('invisible');
  refs.signOutLink.classList.toggle('invisible');
  refs.profileLink.classList.toggle('invisible');
  const firstLink = document.querySelector('.navigationListItem');
  const activePage = document.querySelector('.activePage');
  activePage.classList.remove('activePage');
  firstLink.classList.add('activePage');
  productsPage();
  console.log(shop)
}


const authPage = () => {
  shop.currentPage = 'auth';
  refs.content.innerHTML = authForm();
  const form = document.forms.authForm;

  const getInfo = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    user[name] = value;
  }

  const auth = (e) => {
    e.preventDefault();
    const submitter = e.submitter.name; //dataset
    // console.log(submitter);
    (submitter === 'signup') &&
      signUp(user)
        .then(response => {
          setActiveLinks();
          setDefaultSettings();
          addUserToDB(response.data)
            .then(responseFromDB => {
              localStorage.setItem('user', JSON.stringify({ userDbId: responseFromDB.data.name, token: response.data.idToken, id: response.data.localId, email: response.data.email }));
            });
        });

    (submitter === 'signin') &&
      signIn(user)
        .then(response => {
          getUserDbId(response.data.localId).then(IDCaps => {
            localStorage.setItem('user', JSON.stringify({userDbId: IDCaps,  token: response.data.idToken, id: response.data.localId, email: response.data.email }))
            setActiveLinks();
            setDefaultSettings();
          })

        });
  }


  form.addEventListener('input', getInfo);
  form.addEventListener('submit', auth);
}






export default authPage;
