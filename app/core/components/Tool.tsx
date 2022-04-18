import React from "react"

const Tool = (props) => {
  return (
    <>
      <div>
        <div>
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg bg-white">
                <section className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
                  {props.children}
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tool
