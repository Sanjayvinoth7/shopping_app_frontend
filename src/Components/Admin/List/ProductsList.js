import React from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteProducts } from "../../../Features/ProductSlice";

export default function ProductsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.products);

  const rows =
    items &&
    items.map((item) => {
      console.log(item)
      return {
        id: item._id,
        imageUrl: item.image,
        productName: item.name,
        productDesc: item.desc,
        price: item.price ?.toLocaleString()
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {
        return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt="" />
          </ImageContainer>
        );
      },
    },
    { field: "productName", headerName: "Name", width: 130 },
    {
      field: "productDesc",
      headerName: "Description",
      width: 130,
    },
    {
      field: "price",
      headerName: "Price",
      width: 80,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 170,
      renderCell: (params) => {
        return (
          <Action>
            <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
          
            <View onClick={() => navigate(`/product/${params.row.id}`)}>
              View
            </View>
          </Action>
        );
      },
    },
  ];

  const handleDelete = (id) => {
    dispatch(DeleteProducts(id));
    console.log(handleDelete)
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) =>  {console.log(row);return row.id}}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

const ImageContainer = styled.div`
  img {
    height: 40px;
  }
`;

const Action = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    border: none;
    outline: flex;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;

const View = styled.button`
  background-color: rgb(144, 255, 40);
`;

