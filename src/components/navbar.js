import { useAuth } from "../services/authProvider";

/**
 * 
 * @param {str} active one of "chats", "helper", "referral", "qna"
 * @param {str} user username
 * @returns 
 */
function Navbar ({ active }) {
  const auth = useAuth();

  return (
    <nav class="navbar sticky-top navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#home">Helper-Chatbot</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class={"nav-link" + ((active === "chats") ? " active" : "")} href="#chats">
                Chats
              </a>
            </li>
            <li class="nav-item">
              <a class={"nav-link" + ((active === "helper") ? " active" : "")} href="#helper">
                  Helper Info
              </a>
            </li>
            <li class="nav-item">
              <a class={"nav-link" + ((active === "referral") ? " active" : "")} href="#referral">
                  Referrals
              </a>
            </li>
            <li class="nav-item">
              <a class={"nav-link" + ((active === "qna") ? " active" : "")} href="#qna">
                  Q&A Documents
              </a>
            </li>
          </ul>
        {(auth.user === null) ? 
          <span class="navbar-text"> Please Login </span>
        :
          <div>
            <span class="navbar-text"> Welcome, {auth.user}</span>
            <button class="btn btn-outline-success mx-2" onClick={auth.logout}>Logout</button>
          </div>
        }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;