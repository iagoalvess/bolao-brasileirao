import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CreateGroupProps {
  newGroupName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCreate: () => void;
}

const CreateGroup: React.FC<CreateGroupProps> = ({
  newGroupName,
  onChange,
  onCreate,
}) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">Criar novo grupo</h2>
    <div className="flex items-center gap-4">
      <Input
        placeholder="Nome do grupo"
        value={newGroupName}
        onChange={onChange}
      />
      <Button onClick={onCreate}>Criar</Button>
    </div>
  </div>
);

export default CreateGroup;
