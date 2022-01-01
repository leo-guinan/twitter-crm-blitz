import { useState } from "react"

interface CreateCommunityProps {
  addCommunity: ({}: any) => void
}

const CreateCommunity = ({ addCommunity }: CreateCommunityProps) => {
  const [communityName, setCommunityName] = useState("")
  const [communityDescription, setCommunityDescription] = useState("")

  const handleCreateCommunity = async () => {
    addCommunity({
      name: communityName,
      description: communityDescription,
    })
  }

  const handleCommunityNameChange = (event) => {
    setCommunityName(event.target.value)
  }

  const handleCommunityDescriptionChange = (event) => {
    setCommunityDescription(event.target.value)
  }

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Create a New Community</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500"></p>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Community Name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    onChange={handleCommunityNameChange}
                    value={communityName}
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Description
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  value={communityDescription}
                  onChange={handleCommunityDescriptionChange}
                />
                <p className="mt-2 text-sm text-gray-500">Describe your community.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleCreateCommunity}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}

export default CreateCommunity
