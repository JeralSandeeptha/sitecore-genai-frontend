import type { AlertProps } from '../../types/components.types';
import clsx from 'clsx';

const AlertComponent = (props: AlertProps) => {
  const typeClasses = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 [&>svg]:text-emerald-400',
    error: 'bg-red-500/10 text-red-400 border-red-500/30 [&>svg]:text-red-400',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/30 [&>svg]:text-blue-400',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30 [&>svg]:text-amber-400',
  };

  return (
    <div
      data-slot="alert"
      role="alert"
      className={clsx(
        'max-w-[300px] w-[300px] max-sm:w-full relative rounded-lg border px-4 py-3 text-sm grid flex-col gap-3 bg-neutral-950',
        typeClasses[props.type]
      )}
    >
      <div className="flex gap-3 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-check"
        >
          {props.type === 'success' && (
            <>
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m9 12 2 2 4-4"></path>
            </>
          )}
          {props.type === 'error' && (
            <>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </>
          )}
          {props.type === 'info' && (
            <>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12" y2="16"></line>
            </>
          )}
          {props.type === 'warning' && (
            <>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12" y2="16"></line>
            </>
          )}
        </svg>

        {props.title && (
          <div
            data-slot="alert-title"
            className="col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight"
          >
            {props.title}
          </div>
        )}
      </div>
      <div>
        {props.message && (
          <div
            data-slot="alert-description"
            className="col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed opacity-90"
          >
            {props.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertComponent;