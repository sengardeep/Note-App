import { ShieldAlert, Clock, RefreshCw } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gradient-to-br from-error/20 via-warning/20 to-primary/20 border-2 border-warning/40 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="p-8 md:p-12">
            {/* Icon Section */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-warning/30 rounded-full blur-xl animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-warning to-error p-6 rounded-full shadow-lg">
                  <ShieldAlert className="size-16 md:size-20 text-base-100 animate-bounce" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-warning to-error bg-clip-text text-transparent">
                Whoa There! 🛑
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold text-base-content">
                Rate Limit Exceeded
              </h3>
              
              <div className="bg-base-100/50 backdrop-blur-sm rounded-xl p-6 space-y-3 border border-base-content/10">
                <div className="flex items-center justify-center gap-3 text-base-content">
                  <Clock className="size-5 text-warning animate-spin" />
                  <p className="text-lg font-medium">
                    Too many requests detected
                  </p>
                </div>
                <p className="text-base-content/80 leading-relaxed">
                  You've exceeded the maximum number of requests allowed in this time window. 
                  This helps us maintain a smooth experience for everyone.
                </p>
              </div>

              {/* Action Section */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-center gap-2 text-sm text-base-content/70">
                  <RefreshCw className="size-4" />
                  <span>Please wait a few seconds and try again</span>
                </div>
                
                <div className="flex flex-wrap gap-3 justify-center pt-2">
                  <div className="badge badge-warning badge-lg gap-2 px-4 py-4">
                    <Clock className="size-4" />
                    <span>Wait Time: ~10 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-base-content/60">
            💡 Tip: Slow down your requests to avoid hitting rate limits
          </p>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;