/* eslint-disable comma-dangle */
import { FC, useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Modal, Button } from "components/ui/common";
import { Course, IOrder } from "utils/types";
import useEthPrice from "components/hooks/useEthPrice";

interface Props {
  course: Course;
  onHandleClose: () => void;
  onHandleSubmit: (order: IOrder) => void;
}

const defaultOrder = {
  price: "",
  email: "",
  confirmationEmail: "",
};

/** TODO: Add control and validation, consider Formik and Yup,
 * create shared inputs
 */

const createFormState = (
  { price, email, confirmationEmail }: IOrder,
  hasAgreedTOS: boolean
) => {
  const formState = (isDisabled = false, message = "") => ({
    isDisabled,
    message,
  });

  if (!price || Number(price) <= 0) {
    return formState(true, "Price is not valid.");
  }
  if (confirmationEmail.length === 0 || email.length === 0) {
    return formState(true);
  }
  if (email !== confirmationEmail) {
    return formState(true, "Email are not matching.");
  }
  if (!hasAgreedTOS) {
    return formState(
      true,
      "You need to agree with terms of service in order to submit the form"
    );
  }

  return formState();
};

const OrderModal: FC<Props> = ({ course, onHandleClose, onHandleSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(defaultOrder);
  const [enablePrice, setEnablePrice] = useState(false);
  const [hasAgreedTOS, setHasAgreedTOS] = useState(false);

  const { eth } = useEthPrice();

  useEffect(() => {
    if (course) {
      setIsOpen(true);
      setOrder({
        ...defaultOrder,
        price: eth.perItem,
      });
    }
  }, [course]);

  const handleCloseModal = () => {
    setIsOpen(false);
    setOrder(defaultOrder);
    onHandleClose();
  };

  const handlePriceChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    setOrder({
      ...order,
      price: value,
    });
  };

  const handleToggleEnablePrice = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    setOrder({
      ...order,
      price: checked ? order.price : eth.perItem,
    });
    setEnablePrice(checked);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // alert(`email: ${order.email}`);
    onHandleSubmit(order);
  };

  const formState = createFormState(order, hasAgreedTOS);

  return (
    <Modal isOpen={isOpen}>
      <form
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        onSubmit={handleSubmit}
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="mb-7 text-lg font-bold leading-6 text-gray-900"
                id="modal-title"
              >
                Course Title
              </h3>
              <div className="mt-1 relative rounded-md">
                <div className="mb-1">
                  <label htmlFor="price" className="mb-2 font-bold">
                    Price(eth)
                  </label>
                  <div className="text-xs text-gray-700 flex" id="price">
                    <label className="flex items-center mr-2">
                      <input
                        checked={enablePrice}
                        onChange={handleToggleEnablePrice}
                        type="checkbox"
                        className="form-checkbox"
                      />
                    </label>
                    <span>
                      Adjust Price - only when the price is not correct
                    </span>
                  </div>
                </div>
                <input
                  disabled={!enablePrice}
                  value={order.price}
                  onChange={handlePriceChange}
                  type="number"
                  name="price"
                  id="price"
                  className="disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-700">
                  Price will be verified at the time of the order. If the price
                  is be lower, the order can be declined (+- 2% slipage is
                  allowed)
                </p>
              </div>
              <div className="mt-2 relative rounded-md">
                <div className="mb-1">
                  <label htmlFor="email" className="mb-2 font-bold">
                    Email
                  </label>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={({ target: { value } }) => {
                    setOrder({
                      ...order,
                      email: value.trim(),
                    });
                  }}
                  className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="taro@example.com"
                />
                <p className="text-xs text-gray-700 mt-1">
                  It&apos;s important to fill a correct email, otherwise the
                  order cannot be verified. We are not storing your email
                  anywhere
                </p>
              </div>
              <div className="my-2 relative rounded-md">
                <div className="mb-1">
                  <label htmlFor="confirmationEmail" className="mb-2 font-bold">
                    Repeat Email
                  </label>
                </div>
                <input
                  type="email"
                  name="confirmationEmail"
                  id="confirmationEmail"
                  onChange={({ target: { value } }) => {
                    setOrder({
                      ...order,
                      confirmationEmail: value.trim(),
                    });
                  }}
                  className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="taro@example.com"
                />
              </div>
              <div className="text-xs text-gray-700 flex">
                <label className="flex items-center mr-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={hasAgreedTOS}
                    onChange={({ target: { checked } }) => {
                      setHasAgreedTOS(checked);
                    }}
                  />
                </label>
                <span>
                  I accept Eincode &apos;terms of service&apos; and I agree that
                  my order can be rejected in the case data provided above are
                  not correct
                </span>
              </div>
              {formState.message && (
                <div className="p-4 my-3 text-red-700 bg-red-200 rounded-lg text-sm">
                  {formState.message}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <Button
            variant="red"
            text="Cancel"
            onHandleClick={handleCloseModal}
            className="mr-4"
          />
          <Button text="Submit" type="submit" disabled={formState.isDisabled} />
        </div>
      </form>
    </Modal>
  );
};

export default OrderModal;
