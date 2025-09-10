import OrderStatusCards from '../../../components/AdminDashboard/OrdersPage/OrdersStatusCard'
import Orders from '../../../components/AdminDashboard/OrdersPage/OrderTable'

const AdminOrders = () => {
  return (
    <div className='w-full'>
        <OrderStatusCards/>
        <Orders/>
    </div>
  )
}

export default AdminOrders