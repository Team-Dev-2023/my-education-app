import CheckIcon from "@mui/icons-material/Check";
import { yellow, blueGrey } from "@mui/material/colors";

export default function KnowledgeCheckList(props) {
  const { courseKnowledgeList } = props;
  return (
    <>
      {courseKnowledgeList.map((item) => (
        <li key={item.uuid}>
          <div className="text-[14px] font-[400] my-[4px] flex items-center text-left">
            <CheckIcon
              style={{ color: blueGrey[900] }}
              fontSize="14px"
              className="mr-[16px]"
            />
            <span className="text-sm">{item.description}</span>
          </div>
        </li>
      ))}
    </>
  );
}
