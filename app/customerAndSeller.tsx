import axios from 'axios';
import React, { useState, useEffect } from 'react';
import config from './config';

const RevenueTable = () => {
  const [customerList, setCustomerList] = useState([])
  const [saleList, setSaleList] = useState([])
  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };
  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(`${config.host}/api/admin/get_top_customers`).then(responseData => {
          setCustomerList(responseData.data);
        })
        axios.get(`${config.host}/api/admin/get_top_sellers`).then(responseData => {
          setSaleList(responseData.data);
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="w-full mx-auto">
        <h2 className=" font-bold mb-4">Doanh thu theo khách hàng & sale</h2>
        <div className="flex justify-between space-x-4">
          <div className="w-2/3 bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Top 5 khách hàng</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                  <th className=" text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doanh thu</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thực thu</th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Công nợ</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customerList ? customerList.map((customer: any, index: number) => (
                  <tr key={index}>
                    <td className="px-2 py-2">{index + 1}</td>
                    <td className="px-2 py-2 h-20 w-20">
                      <img src="https://via.placeholder.com/150" alt="Avatar" className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="px-2 py-2">{customer.full_name}</td>
                    <td className="px-2 py-2">{formatVND(parseInt(customer.total))}</td>
                    <td className="px-2 py-2 text-blue-500">{formatVND(parseInt(customer.sum))}</td>
                    <td className="px-2 py-2 text-red-500">{formatVND(parseInt(customer.total) - parseInt(customer.sum))}</td>
                  </tr>
                )) : null}
              </tbody>
            </table>
          </div>
          <div className="w-1/3 bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Top 5 sale</h3>
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                <th className=" text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nhân viên</th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số đơn</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {saleList ? saleList.map((sale: any, index: number) => (
                  <tr key={index}>
                    <td className="px-2 py-2">{index + 1}</td>
                    <td className="px-2 py-2 h-20 w-20">
                      <img src="https://via.placeholder.com/150" alt="Avatar" className="w-10 h-10 rounded-full" />
                    </td>
                    <td className="px-2 py-2">{sale.full_name}</td>
                    <td className="px-2 py-2">{sale.quantity}</td>
                  </tr>
                )) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTable;
