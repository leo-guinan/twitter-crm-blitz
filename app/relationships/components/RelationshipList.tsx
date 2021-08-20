import createTag from "app/tags/mutations/createTag"
import deleteTag from "app/tags/mutations/deleteTag"
import { useMutation, useRouter } from "blitz"
import { Relationship, Tag, TwitterUser } from "db"
import { useState } from "react"
import { Form, FORM_ERROR } from "app/core/components/Form"
import LabeledTextField from "app/core/components/LabeledTextField"

interface TwitterUserWithTags extends TwitterUser {
  tags: Tag[]
}

interface RelationshipWithTwitterUser extends Relationship {
  twitterUser: TwitterUserWithTags
}

interface RelationshipsListProps {
  relationships: RelationshipWithTwitterUser[]
  hasMore: boolean
}

export const RelationshipsList = (props: RelationshipsListProps) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [tags, setTags] = useState({})
  const [createTagMutation] = useMutation(createTag)
  const [deleteTagMutation] = useMutation(deleteTag)
  const relationships = props.relationships
  const hasMore = props.hasMore
  const debounce = (func, delay) => {
    let debounceTimer
    return function () {
      const context = this
      const args = arguments
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
  }
  const handleSearch = debounce(async (event) => {
    console.log("search values: " + event?.target.value)
    try {
      router.push({
        pathname: "/feather/relationships/search",
        query: {
          query: event?.target.value,
        },
      })
    } catch (error) {
      console.error(error)
      return {
        [FORM_ERROR]: error.toString(),
      }
    }
  }, 1000)

  const handleAddTag = async (event) => {
    console.log("adding tag for user: " + event.target.dataset.userId)
    console.log("adding tag " + tags[event.target.dataset.twitterId])
    //actually add the tag here...
    await createTagMutation({
      userId: parseInt(event.target.dataset.userId),
      twitterUserId: event.target.dataset.twitterId,
      value: tags[event.target.dataset.twitterId],
    })
    //remove tag from object
    let updatedTags = tags
    delete updatedTags[event.target.dataset.twitterId]
    setTags({ ...updatedTags })
    console.log(tags)
    //clear input
  }

  const handleRemoveTag = async (event) => {
    event.preventDefault()
    console.log("event target dataset: " + event.target.dataset.userId)
    await deleteTagMutation({
      userId: parseInt(event.target.dataset.userId),
      twitterUserId: event.target.dataset.twitterId,
      value: event.target.dataset.value,
    })
  }

  const handleChange = (event) => {
    let updatedTags = tags
    updatedTags[event.target.dataset.twitterId] = event.target.value
    setTags({ ...updatedTags })
  }

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <div>
        <div className="py-8">
          <header className="w-full shadow-lg bg-white dark:bg-gray-700 items-center h-16 rounded-2xl z-40">
            <div className="relative z-20 flex flex-col justify-center h-full px-3 mx-auto flex-center">
              <div className="relative items-center pl-1 flex w-full lg:max-w-68 sm:pr-2 sm:ml-0">
                <div className="container relative left-0 z-50 flex w-3/4 h-auto h-full">
                  <div className="relative flex items-center w-full lg:w-64 h-full group">
                    <div className="absolute z-50 flex items-center justify-center block w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
                      <svg
                        fill="none"
                        className="relative w-5 h-5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <svg
                      className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                    </svg>
                    <input
                      type="text"
                      className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
                      placeholder="Search"
                      onChange={(e) => {
                        e.persist()
                        handleSearch(e)
                      }}
                      name="query"
                    />
                    <button
                      type="submit"
                      className="absolute right-0 hidden h-auto px-2 py-1 mr-2 text-xs text-gray-400 border border-gray-300 rounded-2xl md:block"
                    >
                      +
                    </button>
                  </div>
                </div>
                {/* <div className="relative p-1 flex items-center justify-end w-1/4 ml-5 mr-4 sm:mr-0 sm:right-auto">
                      <a href="#" className="block relative">
                        <img
                          alt="profil"
                          src="/images/person/1.jpg"
                          className="mx-auto object-cover rounded-full h-10 w-10 "
                        />
                      </a>
                    </div> */}
              </div>
            </div>
          </header>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Bio
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                    >
                      Tags
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {relationships.map((relationship) => (
                    <tr key={relationship.userId + "_" + relationship.twitterUserId}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <a href="#" className="block relative">
                              <img
                                alt="profile"
                                src={relationship.twitterUser.profilePictureUrl}
                                className="mx-auto object-cover rounded-full h-10 w-10 "
                              />
                            </a>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {relationship.twitterUser.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {relationship.twitterUser.bio}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">No status set</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {relationship.twitterUser.tags.map((tag) => (
                          <span
                            key={
                              relationship.userId + "_" + relationship.twitterUserId + "_" + tag.id
                            }
                            className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">
                              {tag.value}{" "}
                              {/* <FontAwesomeIcon
                                icon={faMinus}
                                data-user-id={relationship.userId}
                                data-twitter-id={relationship.twitterUserId}
                                data-value={tag.value}
                                onClick={handleRemoveTag}
                              /> */}
                              <button
                                data-user-id={relationship.userId}
                                data-twitter-id={relationship.twitterUserId}
                                data-value={tag.value}
                                onClick={handleRemoveTag}
                              >
                                x
                              </button>
                            </span>
                          </span>
                        ))}
                        <input
                          type="text"
                          placeholder="tag name"
                          data-twitter-id={relationship.twitterUserId}
                          onChange={handleChange}
                          value={tags[relationship.twitterUserId] || ""}
                          className="border"
                        />
                        <a
                          onClick={handleAddTag}
                          data-user-id={relationship.userId}
                          data-twitter-id={relationship.twitterUserId}
                        >
                          Add Tag
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {hasMore && (
        <>
          <button disabled={page === 0} onClick={goToPreviousPage}>
            Previous
          </button>
          <button disabled={!hasMore} onClick={goToNextPage}>
            Next
          </button>
        </>
      )}
    </div>
  )
}
