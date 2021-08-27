import createTag from "app/tags/mutations/createTag"
import deleteTag from "app/tags/mutations/deleteTag"
import { getAntiCSRFToken, useMutation, useQuery, useRouter } from "blitz"
import { Relationship, Tag, TwitterUser } from "db"
import React, { ChangeEvent, Fragment, useRef, useState } from "react"
import { Form, FORM_ERROR } from "app/core/components/Form"
import LabeledTextField from "app/core/components/LabeledTextField"
import Button from "app/core/components/Button"
import { Dialog, Transition } from "@headlessui/react"
import { AnnotationIcon } from "@heroicons/react/outline"
import getTagsForUser from "app/tags/queries/getTagsForUser"

interface RelationshipWithTwitterUserAndTags extends Relationship {
  tags: Tag[]
  twitterUser: TwitterUser
}

interface RelationshipsListProps {
  relationships: RelationshipWithTwitterUser[]
  hasMore: boolean
}

export const RelationshipsList = (props: RelationshipsListProps) => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [newTags, setNewTags] = useState({})
  const [selections, setSelections] = useState({})
  const [createTagMutation] = useMutation(createTag)
  const [deleteTagMutation] = useMutation(deleteTag)
  const [isOpen, setIsOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const [message, setMessage] = useState("")
  const antiCSRFToken = getAntiCSRFToken()
  const [tags] = useQuery(getTagsForUser, {})

  const relationships = props.relationships
  const hasMore = props.hasMore
  const debounce = (func: (event) => void, delay) => {
    let debounceTimer
    return function (event) {
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

  const selectedUserCount = () => {
    const identifiers = Object.keys(selections)
    const selected = identifiers.filter(function (id) {
      return isUserOnPage(id) && selections[id]
    })
    return selected.length
  }

  const handleAddTag = async (event) => {
    console.log("adding tag for user: " + event.target.dataset.userId)
    console.log("adding tag " + newTags[event.target.dataset.twitterId])
    //actually add the tag here...
    await createTagMutation({
      userId: parseInt(event.target.dataset.userId),
      twitterUserId: event.target.dataset.twitterId,
      value: newTags[event.target.dataset.twitterId],
      relationshipType: event.target.dataset.relationshipType,
    })
    //remove tag from object
    let updatedTags = newTags
    delete updatedTags[event.target.dataset.twitterId]
    setNewTags({ ...updatedTags })
    console.log(newTags)
    //clear input
  }

  const handleRemoveTag = async (event) => {
    event.preventDefault()
    console.log("event target dataset: " + event.target.dataset.userId)
    await deleteTagMutation({
      userId: parseInt(event.target.dataset.userId),
      twitterUserId: event.target.dataset.twitterId,
      value: event.target.dataset.value,
      relationshipType: event.target.dataset.relationshipType,
    })
  }

  const handleChange = (event) => {
    let updatedTags = newTags
    updatedTags[event.target.dataset.twitterId] = event.target.value
    setNewTags({ ...updatedTags })
  }

  const handleSelect = (event) => {
    let updatedSelections = selections
    updatedSelections[event.target.dataset.twitterId] = event.target.checked
    setSelections({ ...updatedSelections })
    console.log(selections)
  }

  const isUserOnPage = (twitterUserId) => {
    const checked = relationships.filter((relationship) => {
      return relationship.twitterUserId === twitterUserId
    })
    return checked.length > 0
  }

  const handleClick = async () => {
    const identifiers = Object.keys(selections)
    const selected = identifiers.filter(function (id) {
      return isUserOnPage(id) && selections[id]
    })

    console.log("Sending a DM to: " + selected)
    const response = await window.fetch("/api/twitter/send-direct-message", {
      method: "POST",
      credentials: "include",
      headers: {
        "anti-csrf": antiCSRFToken,
      },
      body: JSON.stringify({
        twitterUserIds: selected,
        message: message,
      }),
    })
    setSelections({})
    setIsOpen(false)
  }

  const handleMessageChange = (event) => {
    setMessage(event.target.value)
  }

  const handleSelectRelationshipType = (event) => {
    if (event.target.value) {
      console.log("Filter by relationship type: " + event.target.value)
      try {
        router.push({
          pathname: `/feather/relationships/${event.target.value}`,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleFilterByTag = (event) => {
    console.log("Filtering by tag: " + event.target.value)
    try {
      router.push({
        pathname: `/feather/relationships/tag/${event.target.value}`,
      })
    } catch (error) {
      console.error(error)
    }
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
                <div className="container relative left-0 z-50 flex h-full">
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
                  <div className="relative flex flex-auto items-center w-full lg:w-64 h-full group">
                    <Button
                      label="Send DM to Selected Users"
                      color="blue"
                      onClick={() => setIsOpen(true)}
                      className="w-64"
                    />

                    <Transition.Root show={isOpen} as={Fragment}>
                      <Dialog
                        as="div"
                        auto-reopen="true"
                        className="fixed z-10 inset-0 overflow-y-auto"
                        initialFocus={cancelButtonRef}
                        onClose={setIsOpen}
                      >
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                          <Transition.Child
                            as={Fragment}
                            enter="easfollowinge-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                          </Transition.Child>

                          {/* This element is to trick the browser into centering the modal contents. */}
                          <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                          >
                            &#8203;
                          </span>
                          <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <AnnotationIcon
                                      className="h-6 w-6 text-red-600"
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title
                                      as="h3"
                                      className="text-lg leading-6 font-medium text-gray-900"
                                    >
                                      Send DM to {selectedUserCount()} users
                                    </Dialog.Title>
                                    <div className="mt-2">
                                      <p className="text-sm text-gray-500">
                                        <label className="text-gray-700" htmlFor="comment">
                                          <textarea
                                            className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                            id="comment"
                                            placeholder="Enter your message"
                                            name="comment"
                                            rows={5}
                                            cols={40}
                                            value={message}
                                            onChange={handleMessageChange}
                                          ></textarea>
                                        </label>
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                  <Button onClick={handleClick} label="Send" color="blue" />

                                  <Button
                                    onClick={() => setIsOpen(false)}
                                    // ref={cancelButtonRef}
                                    label="Cancel"
                                    color="red"
                                  />
                                </div>
                              </div>
                            </div>
                          </Transition.Child>
                        </div>
                      </Dialog>
                    </Transition.Root>
                    {tags.length === 0 && (
                      <span className="flex-auto py-2 px-3 bg-white h-full w-64 ">
                        No Tags Available To Filter On
                      </span>
                    )}
                    {tags.length > 0 && (
                      <label
                        className="flex flex-auto justify-center text-gray-700 w-64"
                        htmlFor="tags"
                      >
                        <select
                          id="tags"
                          className="block w-64 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500  flex-initial"
                          name="tags"
                          onChange={handleFilterByTag}
                        >
                          <option value=""> Filter By Tag</option>
                          {tags.map((tag) => (
                            <option value={tag.value} key={tag.value}>
                              {tag.value} ({tag._count["twitterUserId"]})
                            </option>
                          ))}
                        </select>
                      </label>
                    )}

                    <label
                      className="flex flex-auto justify-center text-gray-700 w-64"
                      htmlFor="relationshipType"
                    >
                      <select
                        id="relationshipType"
                        className="block w-52 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        name="relationshipType"
                        onChange={handleSelectRelationshipType}
                      >
                        <option value="">Relationship Type</option>
                        <option value="follower">Follower</option>
                        <option value="following">Following</option>
                        <option value="mutual">Mutual</option>
                      </select>
                    </label>
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
                      Selected
                    </th>
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
                      Relationship Type
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
                      <td>
                        <div className="flex flex-wrap content-center justify-center">
                          <input
                            type="checkbox"
                            data-twitter-id={relationship.twitterUserId}
                            // value={selections[relationship.twitterUserId] || false}
                            onChange={handleSelect}
                          />
                        </div>
                      </td>
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
                        <p className="text-gray-900 whitespace-no-wrap">{relationship.type}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {relationship.status || "No status set"}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {relationship.tags.map((tag) => (
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
                                data-relationship-type={tag.relationshipType}
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
                          value={newTags[relationship.twitterUserId] || ""}
                          className="border"
                        />
                        <a
                          onClick={handleAddTag}
                          data-user-id={relationship.userId}
                          data-twitter-id={relationship.twitterUserId}
                          data-relationship-type={relationship.type}
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
