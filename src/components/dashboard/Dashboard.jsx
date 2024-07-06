import "./Dashboard.css";
import describtionImg from "../../assets/autozoom.png";
import { Image } from "antd";

function Dashboard() {
  return (
    <section id="dashboard">
      <h1 className="dashboard-title">Welcome to Avtozoom Admin Panel</h1>

      <p className="dashboard-info">
        Our user-friendly admin panel provides a seamless and efficient way to
        manage your vehicle inventory. Designed with simplicity and
        functionality in mind, this powerful interface allows you to oversee and
        update your car models, brands, locations, and more with ease. Here’s
        what makes our admin panel stand out:
      </p>

      <div className="dashboard-content">
        <Image
          src={describtionImg}
          alt="describtion img"
          style={{
            clipPath:
              "polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 0 53%, 0% 0%)",
          }}
        />

        <div className="dashboard-content-text">
          <h2>Intuitive Navigation:</h2>
          <p>
            Quickly access different sections such as Dashboard, Categories,
            Brands, Models, Locations, Cities, and Cars using the clear and
            organized sidebar menu.
          </p>
          <h2>Efficient Model Management:</h2>
          <p>
            View, edit, and delete car models effortlessly. Each model entry
            displays the name, associated brand, and provides intuitive action
            buttons for quick edits or removals.
          </p>
          <h2>Brand Association:</h2>
          <p>
            Easily add new car brands and link them to various models. Maintain
            an organized and up-to-date catalog of all vehicle brands available
            in your inventory
          </p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
