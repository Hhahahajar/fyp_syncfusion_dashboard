import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { contextMenuItems, ordersGrid } from '../data/dummy';

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orders'); // Ensure the endpoint matches your server setup
        console.log('Fetched data:', response.data);
        setOrdersData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Orders data state:', ordersData); // Log the ordersData state to debug
  }, [ordersData]);

  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders">
        <Link to="/orders/add" className="button-soft-green">Add New Order</Link>
      </Header>
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective
              key={index}
              field={item.field}
              headerText={item.headerText}
              width={item.width}
              textAlign={item.textAlign}
              format={item.format}
              editType={item.editType}
              isPrimaryKey={item.isPrimaryKey}
              validationRules={item.validationRules}
            />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </div>
  );
};

export default Orders;
