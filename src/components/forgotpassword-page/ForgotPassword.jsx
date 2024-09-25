import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

// Set the CSRF token in the axios configuration
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const ForgotPasswordPage = (email) => {
  const [forgotEmail, setForgotEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.title = "Forgot Password";
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = JSON.stringify({ email });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validate email input
    if (
      !forgotEmail ||
      !forgotEmail.includes("@") ||
      !forgotEmail.includes(".")
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    // Function to extract CSRF token from cookies
    const getCookie = (name) => {
      const cookieValue = document.cookie.match(
        "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
      );
      return cookieValue ? cookieValue.pop() : "";
    };

    try {
      const csrfToken = getCookie("csrftoken"); // Get CSRF token from cookies
      const response = await axios.post(
        "https://guptag.pythonanywhere.com/accounts/reset_password/",
        body,
        config,
        { email: forgotEmail },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken, // Include CSRF token in headers
          },
        }
      );
      if (response.data && response.data.message) {
        setIsSubmitted(true);
        setSuccessMessage(response.data.message);
        openModal(); // Open the dialog box
      } else {
        alert("Entered mail address not found! Please check and try again.");
        isSubmitted();
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    } finally {
      setForgotEmail("");
    }
  };

  return (
    <section className="section-content padding-y">
      <div className="container-xl d-flex justify-content-center align-items-center mt-5">
        <div className="col-xl-4">
          <div className="card mb-4">
            <div className="card-header text-center fs-2">Reset Password</div>
            <form className="form" onSubmit={handleSubmit}>
              <p className="mt-3 text-start">
                Please enter your e-mail address. You will receive an e-mail
                along with a link which can be used to reset your password.
              </p>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Registered Email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  title="Please enter a valid email address"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-success w-100">
                Send Reset Link
              </button>
              <p className="mt-3 text-end">
                <a href="/login">Back to Login</a>
              </p>
            </form>
            {error && <p className="error-message">{error}</p>}
            {successMessage && (
              <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black/25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900"
                          >
                            Password Reset Link Sent
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              We've emailed you instructions for setting your
                              password, // if an account exists with the email
                              you entered. You // should receive them shortly.
                              If you don't receive an // email, please make sure
                              you've entered the address you // registered with,
                              and check your spam folder.
                            </p>
                          </div>

                          <div className="mt-4">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                              onClick={closeModal}
                            >
                              Got it, thanks!
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
