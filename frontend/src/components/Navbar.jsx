/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux';
import { ExitToApp, Person } from '@mui/icons-material';
import { LogoutUser } from '../redux/action/userAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const navItems = [
  {
    title: 'Home',
    href: '/',
  },
  // {
  //   title: 'Properties',
  //   href: '/properties',
  // },
  {
    title: 'Services',
    href: '/services',
  },
  { title: 'Car Rental', href: '/car-rental' },
  { title: 'Contact', href: '/contact' },
]

const DropdownMenu = ({ items }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 mt-2 w-48 rounded-lg shadow-xl bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"
    >
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
            role="menuitem"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

const MobileMenuItem = ({ item, pathname, setClose }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between">
        {item.dropdownItems ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out flex items-center justify-between"
          >
            {item.title}
            <svg
              className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        ) : (
          <Link
          onClick={()=>setClose(false)}
            to={item.href}
            className={`block px-4 py-3 rounded-lg text-base font-medium transition duration-150 ease-in-out ${
              pathname === item.href
                ? 'text-[#8FA282]'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {item.title}
          </Link>
        )}
      </div>
      <AnimatePresence>
        {isOpen && item.dropdownItems && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="pl-6 border-l border-gray-200 mt-1">
              {item.dropdownItems.map((dropdownItem, index) => (
                <Link
                  key={index}
                  to={dropdownItem.href}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-150"
                >
                  {dropdownItem.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const MobileMenu = ({ items, pathname, isOpen, setClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-[101px] z-[101] left-0 right-0 min-[850px]:hidden overflow-hidden bg-white shadow-lg"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {items.map((item, index) => (
              <MobileMenuItem key={index} item={item}  pathname={pathname} setClose={setClose}/>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const UserDropdown = ({ user, drop, handledrop, actionloading, logout, role, textColor, bgHover }) => {
  return (
    <div className="relative">
      <button
        onClick={handledrop}
        className={`flex items-center space-x-2 p-1 rounded-full ${bgHover} transition-colors duration-150`}
      >
        <img
          src={user?.profile && user?.profile !== "Profile" ? `${import.meta.env.VITE_BASE_URL}${user.profile}` : "https://avatars.mds.yandex.net/i?id=e1e984c8dfbafa0fbc6fc1b4a191a9d903249a02-7762396-images-thumbs&n=13"}
          className="w-8 h-8 rounded-full object-cover"
          alt="Profile"
        />
        {user && <span className={`text-sm font-medium ${textColor} hidden sm:block`}>{user.name || 'User'}</span>}
      </button>
      <AnimatePresence>
        {drop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
          >
            <ul className="py-1">
              <li className="px-4 py-2">
                <Link
                  to={role === "admin" ? "/admin-dashboard" : "/dashboard"}
                  onClick={handledrop}
                  className="flex items-center space-x-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-4 py-2 rounded transition-colors duration-150"
                >
                  <Person className="text-gray-500" fontSize="small" />
                  <span>Dashboard</span>
                </Link>
              </li>
              {role === "user" && (
                <li className="px-4 py-2">
                  <Link
                    to="/whishlist"
                    onClick={handledrop}
                    className="flex items-center space-x-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-4 py-2 rounded transition-colors duration-150"
                  >
                    <FavoriteIcon className="text-gray-500" fontSize="small" />
                    <span>Wishlist</span>
                  </Link>
                </li>
              )}
              <li className="px-4 py-2 border-t">
                <button
                  onClick={logout}
                  className="flex items-center space-x-3 w-full text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-4 py-2 rounded transition-colors duration-150"
                  disabled={actionloading}
                >
                  <ExitToApp className="text-gray-500" fontSize="small" />
                  <span>{actionloading ? "Logging out..." : "Logout"}</span>
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Navbar = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [drop, setDrop] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { user, actionloading } = useSelector((state) => state.User)
  const pathname = useLocation().pathname
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index)
  }

  const handledrop = () => setDrop(!drop)

  const logout = () => {
    dispatch(LogoutUser(navigate))
    setDrop(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20) // Subtle trigger at 20px for smoother effect
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // White background across all pages
  const bgClass = `bg-white/95 backdrop-blur-sm ${scrolled ? 'shadow-lg' : 'shadow-sm'}`
  const textClass = 'text-[#8FA282]'
  const hoverClass = 'hover:text-gray-900'
  const bgHover = 'hover:bg-[#8FA282]/10'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] pt-1 transition-all duration-300 ease-in-out flex items-center ${bgClass} border-b border-gray-200`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className='flex justify-center items-center'>
            <div>
              <a
        href="https://wa.me/+31655518120"
        target="_blank"
        rel="noopener noreferrer"
        className=" bg-green-500 hover:bg-green-600 text-white p-3 flex justify-center items-center rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 space-x-1"
        aria-label="Contact us on WhatsApp"
        title="Contact us on WhatsApp (+31 655 518 120)"
      >
        <WhatsAppIcon fontSize="medium" />
        <span>WhatsApp Met Ons</span>
      </a>
            </div>
          </div>
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src="/images/logo.png"
                  className="lg:h-16 lg:w-16 rounded-full object-cover md:h-14 h-12 md:w-14 w-12 transition-transform duration-200 hover:scale-105"
                  alt="Logo"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden min-[850px]:flex items-center space-x-8 ml-10">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  {item.dropdownItems ? (
                    <button
                      onClick={() => handleDropdownToggle(index)}
                      className={`${textClass} inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${hoverClass} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8FA282]/50`}
                      aria-haspopup="true"
                    >
                      {item.title}
                      <svg
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${openDropdownIndex === index ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 relative group ${textClass} ${pathname === item.href ? 'text-gray-900' : hoverClass} `}
                    >
                      {item.title}
                      <span
                        className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#8FA282] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${
                          pathname === item.href ? 'scale-x-100' : ''
                        }`}
                      />
                    </Link>
                  )}
                  <AnimatePresence>
                    {openDropdownIndex === index && item.dropdownItems && (
                      <DropdownMenu items={item.dropdownItems} />
                    )}
                  </AnimatePresence>
                </div>
              ))}
              {/* User Actions */}
              {user?.role==="admin" && (
                <UserDropdown
                  user={user}
                  drop={drop}
                  handledrop={handledrop}
                  actionloading={actionloading}
                  logout={logout}
                  pathname={pathname}
                  role={user?.role}
                  textColor={textClass}
                  bgHover={bgHover}
                />
              )}
            </div>

            {/* Mobile Actions */}
            <div className="min-[850px]:hidden flex items-center space-x-3">
              {user?.role==="admin" && (
                <UserDropdown
                  user={user}
                  drop={drop}
                  handledrop={handledrop}
                  actionloading={actionloading}
                  logout={logout}
                  pathname={pathname}
                  role={user?.role}
                  textColor={textClass}
                  bgHover={bgHover}
                />
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-md ${textClass} ${hoverClass} ${bgHover} focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#8FA282]/50`}
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

      </nav>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/+31655518120"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[60] bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Contact us on WhatsApp"
        title="Contact us on WhatsApp (+31 655 518 120)"
      >
        <WhatsAppIcon fontSize="large" />
      </a>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 min-[850px]:hidden bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <MobileMenu items={navItems} pathname={pathname} isOpen={isMobileMenuOpen} setClose={setIsMobileMenuOpen} />
    </>
  )
}

export default Navbar