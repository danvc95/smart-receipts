import { useStore } from "../stores/store";


/**
 * @param left
 * @param right
 */
const TitleBar = (props) => {
  return (
    <div className="titleBar flex w-full max-w-md">
      <div className="flex-1">
        { props.left &&
          props.left
        }
      </div>
      <div className="flex-1 text-center">
        <h1 className="text-lg font-bold tracking-tight">
          SmartReceipts
        </h1>
      </div>
      <div className="flex-1 text-right">
        { props.right &&
          props.right
        }
      </div>
    </div>

  )
}

export default TitleBar;