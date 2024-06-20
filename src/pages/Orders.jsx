<<<<<<< Updated upstream
import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Toolbar, Inject } from '@syncfusion/ej2-react-grids';
import { useNavigate } from 'react-router-dom';
>>>>>>> Stashed changes
import { Header } from '../components';

const Orders = () => {
<<<<<<< Updated upstream
  const editing = { allowDeleting: true, allowEditing: true };
=======
  const [ordersData, setOrdersData] = useState([]);
  const toolbarOptions = ['Add', 'Edit', 'Delete'];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orders');
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

  const toolbarClick = (args) => {
    if (args.item.id.includes('gridcomp_add')) {
      navigate('/orders/add');
    }
  };

>>>>>>> Stashed changes
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        toolbar={toolbarOptions}
        editSettings={editing}
        toolbarClick={toolbarClick}
      >
        <ColumnsDirective>
<<<<<<< Updated upstream
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
=======
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
>>>>>>> Stashed changes
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar]} />
      </GridComponent>
    </div>
  );
};
export default Orders;
