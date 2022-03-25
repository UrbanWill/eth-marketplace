import { FC, useState } from "react";

import { Button } from "components/ui/common";

interface Props {
  onVerify: (email: string) => void;
}

const VerificationInput: FC<Props> = ({ onVerify }) => {
  const [email, setEmail] = useState<string>("");

  return (
    <div className="flex items-center mr-2 relative rounded-md">
      <input
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        type="email"
        name="account"
        id="account"
        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md mr-2"
        placeholder="0x2341ab..."
      />
      <Button
        text="Veirfy"
        onHandleClick={() => {
          onVerify(email);
        }}
      />
    </div>
  );
};

export default VerificationInput;
