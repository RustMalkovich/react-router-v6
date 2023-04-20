import users from "./fake.api";
import {
  NavLink,
  Route,
  useParams,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

function MainPage() {
  return (
    <>
      <h1>Home Page</h1>
      <NavLink to="/users">Users List Page</NavLink>
    </>
  );
}

function UsersListPage() {
  return (
    <div>
      <h3>Users List Page</h3>

      <ul>
        {users.map((user) => {
          return (
            <li key={user._id}>
              <NavLink to={`/users/${user._id}/profile`}>{user.name}</NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function UserPage() {
  const { userId } = useParams();

  return (
    <div>
      <h3>User Page</h3>

      <ul>
        <li>
          <NavLink to="/users">Users List Page</NavLink>
        </li>
        <li>
          <NavLink to={`/users/${userId}/edit`}>Edit User Page</NavLink>
        </li>
      </ul>

      <p>{`UserId: ${userId}`}</p>
    </div>
  );
}

function EditUserPage() {
  const { userId } = useParams();
  const nextUserId = Number(userId) + 1;

  return (
    <div>
      <h2>Edit User Page</h2>

      <ul>
        <li>
          <NavLink to={`/users/${userId}/profile`}>User Profile</NavLink>
        </li>
        <li>
          <NavLink to={`/users/${nextUserId}/profile`}>
            Another User Page
          </NavLink>
        </li>
        <li>
          <NavLink to="/users">Users List Page</NavLink>
        </li>
      </ul>
    </div>
  );
}

function Users() {
  return (
    <div>
      <h3>Users Layout</h3>

      <p>
        <NavLink to="/">Home page</NavLink>
      </p>

      <Outlet />
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>App Layout</h1>

      <Routes>
        <Route index element={<MainPage />} />
        <Route path="users" element={<Users />}>
          <Route index element={<UsersListPage />} />
          <Route path=":userId">
            <Route path="profile" element={<UserPage />} />
            <Route path="edit" element={<EditUserPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
