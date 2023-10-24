import React, { useState, useEffect } from "react";
import DebounceTextInput from "../../DebounceTextInput";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { getAllUniversities } from "../../../store/slice/university/universitySlice";
import { CreateUniversity } from "../../modals/CreateUniversity";
import { EditUniversity } from "../../modals/EditUniversity";
import { deleteUniversity } from "../../../helpers/universityHelper/createEditDeleteUniversity";
export default function UniversityTab() {
  const [perPage, setPerPage] = useState(10);
  const [createUniversityModal, setCreateUniversityModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const [editUniversityModal, setEditUniversityModal] = useState(false);
  const [filter, setFilter] = useState("");
  const dispatch = useDispatch();
  const universities = useSelector(
    (state) => state.universitySlice.universityState.universities
  );
  const totalRecords = useSelector(
    (state) => state.universitySlice.universityState.pagination.totalRecords
  );
  const loading = useSelector(
    (state) => state.universitySlice.universityState.status
  );

  useEffect(() => {
    dispatch(getAllUniversities({ page: 1, size: perPage, filter }));
  }, []);

  const handleEditButton = (row) => {
    setEditUniversityModal(true);
    setSelectedRows(row);
  };

  const deleteHandler = async (id) => {
    const response = await deleteUniversity(id);
    if (response.status) {
      Swal.fire({
        title: "Başarılı",
        text: response.message,
        icon: "success",
        showClass: {
          popup: "animate_animated animate_fadeInDown",
        },
        hideClass: {
          popup: "animate_animated animate_fadeOutUp",
        },
        timer: 3000,
      });
      dispatch(getAllUniversities({ page: 1, size: perPage }));
    } else {
      Swal.fire({
        title: "Hata",
        text: response.message,
        icon: "error",
        showClass: {
          popup: "animate_animated animate_fadeInDown",
        },
        hideClass: {
          popup: "animate_animated animate_fadeOutUp",
        },
        timer: 3000,
      });
    }
  };
  const columns = [
    {
      name: "Üniversite Adı",
      sortable: true,
      selector: (row) => row.name,
    },
    {
      name: "Üniversite ID",
      sortable: true,
      selector: (row) => row.university_id,
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
                (sweetAlertResult) =>
                  sweetAlertResult.value && deleteHandler(row.id && row.id)
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
              <path stroke="none" d="M0 0h24v24H0z" />{" "}
              <line x1="4" y1="7" x2="20" y2="7" />{" "}
              <line x1="10" y1="11" x2="10" y2="17" />{" "}
              <line x1="14" y1="11" x2="14" y2="17" />{" "}
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />{" "}
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const handlePerRowsChange = async (newPerPage, page) => {
    dispatch(getAllUniversities({ page: page, size: newPerPage }));
    setPerPage(newPerPage);
  };

  const handlePageChange = (page) => {
    dispatch(getAllUniversities({ page: page, size: perPage }));
  };

  const handleFilterChange = (value) => {
    dispatch(getAllUniversities({ filter: value, size: perPage, page: 1 }));
  };

  const handleModalOpen = () => {
    setCreateUniversityModal(true);
  };

  return (
    <div className="p-5">
      <div className="flex">
        <DebounceTextInput
          placeHolder="Üniversite Ara..."
          onChange={(value) => handleFilterChange(value)}
          delay={1000}
        />
        <div>
          <button
            className="bg-emerald-500 ml-5 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleModalOpen}
          >
            Yeni Üniversite Ekle
          </button>
        </div>
      </div>
      <div className="mt-4">
        <DataTable
          columns={columns}
          data={universities}
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
      <CreateUniversity
        showModal={createUniversityModal}
        setShowModal={setCreateUniversityModal}
      />
      <EditUniversity
        showModal={editUniversityModal}
        setShowModal={setEditUniversityModal}
        row={selectedRows}
      />
    </div>
  );
}
