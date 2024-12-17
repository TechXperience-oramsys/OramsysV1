import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { ApiGet } from "../../helper/API/ApiData";
import { toast } from "sonner";

function Profile() {
  // const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState({});

  useEffect(() => {
    ApiGet(`admin/get-admin-by/${id}`)
      .then((res) => {
        setAdminData(res.data);
      })
      .catch((error) => toast.error(error))
      .finally(() => setLoading(false));
  }, [id]);
  if (loading) return <div>Loading...</div>;
  return (
    <div className="product">
      <div class="container-fluid">
        <div id="dash" class="mb-npx">
          <header class="bg-surface-primary pt-6">
            <div
              class="row align-items-center text-white mb-3 product"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #111827, #121b2f, #131f37, #142240, #152548)",
              }}
            >
              <div class="col-sm-6 col-12 mb-4 mb-sm-0">
                <h1 class="h2 mb-0 fw-bold fs-4 ls-tight">
                  {id ? "Profile" : "Admins"}
                </h1>
              </div>
            </div>
          </header>
        </div>
        <div class="card mb-3" style={{ maxWidth: "540px" }}>
          <div class="row m-0">
            <div class="col-md-4">
              <div className="card__image">
                <img src={adminData?.logo} class="card-img" alt="..." />
              </div>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{adminData?.adminName}</h5>
                <p class="card-text">Branch : {adminData?.branch}</p>
                <p class="card-text">Phone : {adminData?.phone}</p>
                <p class="card-text">
                  <small class="text-muted">{adminData?.businessEmail}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
