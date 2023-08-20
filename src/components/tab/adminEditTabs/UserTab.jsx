import React, { useState, useEffect } from "react";
import DebounceTextInput from "../../DebounceTextInput";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getAllUsersRedux } from "../../../store/slice/user/userSlice";
import DataTable from "react-data-table-component";
import { EditUser } from "../../modals/EditUser";
import { deleteUser } from "../../../helpers/userHelper/createEditDeleteUser";
export default function UserTab() {
  const [perPage, setPerPage] = useState(10);
  const [editUserModal, setEditUserModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const users = useSelector((state) => state.userSlice.usersState.users);
  const totalRecords = useSelector((state) => state.userSlice.usersState.totalRows);
  const loading = useSelector((state) => state.userSlice.usersState.status);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsersRedux({ page: 1, size: perPage }));
  }, []);
  const columns = [
    {
      name: "Adı",
      sortable: true,
      selector: (row) => row.first_name,
    },
    {
      name: "Soyadı",
      sortable: true,
      selector: (row) => row.last_name,
    },
    {
      name: "Email",
      sortable: true,
      selector: (row) => row.email,
    },
    {
      name: "Rol",
      sortable: true,
      selector: (row) => row.role,
    },
    {
      name: "Admin",
      sortable: true,
      selector: (row) => {
        return row.isAdmin ? "Evet" : "Hayır";
      },
    },
    {
      name: "Aksiyonlar",
      sortable: true,
      cell: (row) => (
        <div className="flex">
          <button
            className="py-2 px-2 mr-2 ease-in duration-150 rounded flex items-center"
            onClick={() => handleEditButton(row)}
          >
            <svg
              className="h-8 w-8 text-black"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
              <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
              <line x1="16" y1="5" x2="19" y2="8" />
            </svg>
          </button>
          <button
            className="py-2 px-2 mr-4  ease-in duration-150 rounded flex items-center"
            onClick={() =>
              Swal.fire({
                cancelButtonColor: "#dc3545",
                cancelButtonText: "Hayır",
                confirmButtonColor: "#28a745",
                confirmButtonText: "Evet",
                icon: "info",
                width: 350,
                heightAuto: true,
                showCancelButton: true,
                title: "Emin misin ?",
              }).then(
                (sweetAlertResult) => sweetAlertResult.value && deleteHandler(row.id && row.id)
              )
            }
          >
            <svg
              className="h-8 w-8 text-black"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" /> <line x1="4" y1="7" x2="20" y2="7" />{" "}
              <line x1="10" y1="11" x2="10" y2="17" /> <line x1="14" y1="11" x2="14" y2="17" />{" "}
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />{" "}
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const handleEditButton = (row) => {
    console.log(row);
    setEditUserModal(true);
    setSelectedRows(row);
  };

  const deleteHandler = async (id) => {
    const response = await deleteUser(id);
    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "Başarılı",
        text: "Kullanıcı Silindi",
        showConfirmButton: false,
        timer: 1500,
      });
      dispatch(getAllUsersRedux({ page: 1, size: perPage }));
    } else {
      Swal.fire({
        icon: "error",
        title: "Hata",
        text: "Kullanıcı Silinemedi",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    dispatch(getAllUsersRedux({ page: page, size: newPerPage }));
    setPerPage(newPerPage);
  };

  const handlePageChange = (page) => {
    dispatch(getAllUsersRedux({ page: page, size: perPage }));
  };

  const handleFilterChange = (value) => {
    dispatch(getAllUsersRedux({ filter: value, size: perPage, page: 1 }));
  };
  return (
    <div className="p-5">
      <div className="flex">
        <DebounceTextInput />
      </div>
      <div className="mt-4">
        <DataTable
          columns={columns}
          data={users}
          highlightOnHover
          persistTableHead
          pointerOnHover
          pagination
          paginationServer
          paginationTotalRows={totalRecords}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          progressPending={loading}
          onRowClicked={(row) => handleEditButton(row)}
          paginationComponentOptions={{
            rowsPerPageText: "Sayfa başına öğe:",
            rangeSeparatorText: " / ",
            noRowsPerPage: false,
            selectAllRowsItem: false,
          }}
        />
      </div>
      <EditUser showModal={editUserModal} setShowModal={setEditUserModal} row={selectedRows} />
    </div>
  );
}
