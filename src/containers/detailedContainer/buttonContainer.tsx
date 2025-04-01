import IconButton from '@/components/StyledButton';

interface ButtonContainerProps {
  setBtn: (value: string) => void;
}


const ButtonContainer: React.FC<ButtonContainerProps> = ({setBtn}) => {
  const handleClick = (label: string) => {
    setBtn(label)
  };

  return (
    <div className="flex justify-between items-center gap-4 p-4">
      <IconButton icon="MdOutlineHistory" label="Add Notable Activity" onClick={() => handleClick("Home")} />
      <IconButton icon="MdOutlineAddTask" label="Create Task" onClick={() => handleClick("CreateTask")} />
      <IconButton icon="MdOutlineNoteAdd" label="Add Note" onClick={() => handleClick("AddNote")} />
    </div>
  );
};

export default ButtonContainer;
