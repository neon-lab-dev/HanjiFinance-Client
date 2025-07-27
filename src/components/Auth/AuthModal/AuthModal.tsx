import { RxCrossCircled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { setIsModalOpen } from "../../../redux/Features/Auth/authModalSlice";
import Signup from "../Signup/Signup";

const AuthModal = () => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector((state: RootState) => state.authModal);

  return (
    <div
      className={`${
        isModalOpen ? " visible" : " invisible"
      } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] flex items-center justify-center transition-all duration-300`}
    >
      <div
        className={`${
          isModalOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
        } w-[668px] sm:w-[80%] md:w-[30%] dark:bg-slate-800 bg-[#fff] rounded-2xl p-6 transition-all duration-300 z-[999]`}
      >
        <div className="w-full">
          <RxCrossCircled
            onClick={() => dispatch(setIsModalOpen(false))}
            className="text-end justify-self-end text-2xl text-neutral-125 cursor-pointer"
          />
          <h1 className="text-neutral-20 text-xl md:text-2xl font-medium leading-7 text-center mb-8">
            <span className="bg-primary-20 px-2 text-white">Sign Up</span> to
            HanjiFinance
          </h1>
          <Signup/>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
