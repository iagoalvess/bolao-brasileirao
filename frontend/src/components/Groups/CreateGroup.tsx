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
  <div className="bg-soccer-black/70 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-6 mb-6 text-white">
    <h2 className="text-xl font-bold mb-4 text-soccer-yellow/90 drop-shadow">
      Criar novo grupo
    </h2>
    <div className="flex items-center gap-4">
      <Input
        placeholder="Nome do grupo"
        value={newGroupName}
        onChange={onChange}
        className="bg-white/10 text-white placeholder-white/70 border-white/20 focus:ring-soccer-yellow"
      />
      <Button
        onClick={onCreate}
        className="bg-soccer-yellow/80 hover:bg-soccer-yellow/90 text-white"
      >
        Criar
      </Button>
    </div>
  </div>
);

export default CreateGroup;
