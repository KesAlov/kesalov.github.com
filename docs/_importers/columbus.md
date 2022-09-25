def self.validate(opts)

  abort "Specify a username!" if opts["username"].nil?

  abort "Your username must be a number." unless opts["username"].match(%r!\A\d+\z!)

end
