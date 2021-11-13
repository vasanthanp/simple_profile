const root = document.getElementById("root");
//** page contents variable */
let signup = null;
let signin = null;
let update = null;
//** user details variable */
let user = {
  name: null,
  email: null,
  password: null,
  contact: null,
  DOB: null,
  age: null,
};

//** page content */
const signupPage = `
<div class="container">
<div class="signup-page row m-5">
  <div class="col-md-6 text-center image-div signup-image">
    <img src="./assets/images/signup.svg" />
  </div>
  <div class="col-md-6">
    <h1 class="text-center font-weight-bolder">Sign Up</h1>
    <p class="text-center font-weight-bolder">Store your data with us</p>

    <div class="d-flex container-flex">
      <div class="col-md-12">
        <form
        action = ""
        method = ""
          id="form"
          class="col-md-12  d-flex flex-column align-items-center signup"
        >
          <input
            required
            class="form-control m-2"
            type="text"
            name="name"
            placeholder="Name"
          />
          <input
            required
            class="form-control m-2"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            required
            class="form-control m-2"
            type="password"
            name="password"
            placeholder="Password"
          />
          <input
            required
            class="form-control m-2"
            type="text"
            name="contact"
            placeholder="Contact"
          />
          <input
            required
            class="form-control m-2"
            type="text"
            name="age"
            placeholder="Age"
          />
          <input
            required
            class="form-control m-2"
            type="text"
            name="DOB"
            placeholder="DOB in mm/dd/yyyy"
          />

          <button class="btn btn-info" id="submit">Sign Up</button>
        </form>
        <p class="text-center">Already have an account ? <button class="btn btn" onclick="switchSignin()">signin</button></p>
</div>
</div>
</div>
`;
const signinPage = `
<div class="container">
<div class="signup-page row m-5">
  <div class="col-md-6 text-center image-div signup-image">
    <img src="./assets/images/signup.svg" />
  </div>
  <div class="col-md-6">
    <h1 class="text-center font-weight-bolder">Sign In</h1>
    <p class="text-center font-weight-bolder">Get more fun with us</p>
    <div class="d-flex container-flex">
      <div class="col-md-12">
        <form
        action = ""
        method = ""
          id="form"
          class="col-md-12  d-flex flex-column align-items-center signin"
        >
         
          <input
            required
            class="form-control m-2"
            type="email"
            name="email"
            placeholder="Email"
          />
          <input
            required
            class="form-control m-2"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button class="btn btn-info" id="submit">Sign in</button>
        </form>
        <p class="text-center">Don't have an account ? <button class="btn btn" onclick="switchSignup()">sign up</button></p>
        
        </div>
        </div>
`;
const ProfilePage = ({ name, email, contact, age, DOB }) => `
<div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card profile-card">
            <img src="./assets/images/signup.svg" class="card-img-top" />
            <div class="card-body">
              <h3 class="text-center">${name}</h3>
              <p class="text-center">${email}</p>
              <p class="text-center">Contact : ${contact}</p>
              <p class="text-center">DOB : ${DOB}</p>
              <p class="text-center">Age : ${age}</p>
              <div class="text-center">
                <button class="btn btn-success" onclick="switchUpdatePage()">
                  update Details
                </button>
              </div>
              <div class="text-center mt-2">
                <button class="btn btn-danger" onclick="logout()">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
`;

const updatePage = ({ email, name, contact, age, DOB }) => `
<div class="container">
<div class="row my-5">
  <div class="col-md-12 ">
    <h1 class="text-center font-weight-bolder">Update Details</h1>
    <p class="text-center font-weight-bolder">Always update yourself with us</p>

    <div class="d-flex container-flex justify-content-center">
      <div class="col-md-6">
        <form
        action = ""
        method = ""
          id="form"
          class="col-md-12  d-flex flex-column align-items-center update"
        >
          <input
            required
            class="form-control m-2"
            type="text"
            name="name"
            placeholder="Name"
            value = ${name}
          />
          <input
            required
            class="form-control m-2"
            type="email"
            name="email"
            placeholder="Email"
            value = ${email}
          />
          <input
            required
            class="form-control m-2"
            type="text"
            name="contact"
            placeholder="Contact"
            value = ${contact}
          />
          <input
            required
            class="form-control m-2"
            type="text"
            name="age"
            placeholder="Age"
            value = ${age}
          />
          <input
            required
            class="form-control m-2"
            type="text"
            name="DOB"
            placeholder="DOB in mm/dd/yyyy"
            value = ${DOB}
          />

          <button class="btn btn-info" id="update">Update Details</button>
        </form>
</div>
</div>
</div>

`;

const handleSignup = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const formJSON = Object.fromEntries(data.entries());
  try {
    const response = await fetch("http://localhost:5000/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJSON),
    });
    const result = await response.json();
    if (result.success) {
      root.innerHTML = signinPage;
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.log(err);
  }
};
const handleSignin = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const formJSON = Object.fromEntries(data.entries());
  console.log(formJSON);
  try {
    const response = await fetch("http://localhost:5000/api/v1/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJSON),
    });
    const result = await response.json();
    if (result.success) {
      result.user.DOB = new Date(result.user.DOB).toLocaleDateString();
      sessionStorage.setItem("user", JSON.stringify(result.user));
      root.innerHTML = ProfilePage(result.user);
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.log(err);
  }
};
const handleUpdate = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  const formJSON = Object.fromEntries(data.entries());
  const updated_user = {};
  const existing_user = JSON.parse(sessionStorage.getItem("user"));
  for (let detail in existing_user) {
    if (existing_user[detail] != formJSON[detail])
      updated_user[detail] = formJSON[detail];
  }
  updated_user.id = existing_user.id;
  if (Object.keys(updated_user).length <= 1) return alert("Noting to update");
  try {
    const response = await fetch("http://localhost:5000/api/v1/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated_user),
    });
    const result = await response.json();
    if (result.success) {
      console.log(result);
      sessionStorage.setItem(
        "user",
        JSON.stringify({ ...existing_user, ...updated_user })
      );
      switchProfile();
    } else {
      alert(result.message);
    }
  } catch (err) {
    console.log(err);
  }
};
const switchSignin = (e) => {
  if (e) e.preventDefault();
  root.innerHTML = signinPage;
  signin = document.querySelector("#form.signin");
  signin.addEventListener("submit", handleSignin);
};
const switchSignup = (e) => {
  if (e) e.preventDefault();
  root.innerHTML = signupPage;
  signup = document.querySelector("#form.signup");
  signup.addEventListener("submit", handleSignup);
};
const switchProfile = (e) => {
  if (e) e.preventDefault();
  const lcl_user = sessionStorage.getItem("user");
  if (
    lcl_user !== "undefined" ||
    JSON.parse(Object.keys(lcl_user).length > 0)
  ) {
    user = JSON.parse(lcl_user);
    root.innerHTML = ProfilePage(user);
  } else {
    root.innerHTML = signupPage;
  }
};
const switchUpdatePage = (e) => {
  if (e) e.preventDefault();
  user = JSON.parse(sessionStorage.getItem("user"));
  root.innerHTML = updatePage(user);
  update = document.querySelector("#form.update");
  update.addEventListener("submit", handleUpdate);
};

const logout = (e) => {
  sessionStorage.removeItem("user");
  switchProfile();
};
if (sessionStorage.getItem("user")) switchProfile();
else switchSignup();
